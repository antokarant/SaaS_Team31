import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class KeywordService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createKeywordDto: CreateKeywordDto) : Promise<Keyword> { // typescript requires specification of return type
        const keyword = await this.manager.create(Keyword, createKeywordDto); // createKeywordDto is a subtype of keyword
        return this.manager.save(keyword); // returns a promise for the quiz as it was saved in the database
        // not returning keyword after saving because the promise includes the automatically generated name (by the orm)
    }

    async findAll() : Promise<Keyword[]> {
        return this.manager.find(Keyword); // does not need await, returns promise
    }

    async findOne(name: string) : Promise<Keyword> {
        const result = await this.manager.findOne(Keyword, name, { relations: ["questions"] }); // the additional option joins tables and returns the correpsonding answers too
        if(!result) throw new NotFoundException(`Keyword ${name} not found`);
        return result;
    }

    async update(name: string, updateKeywordDto: UpdateKeywordDto) : Promise<Keyword> {
        // very important that the process be atomic, that is, account for the fact that the data might change during the update (bank accounts etc)
        return this.manager.transaction(async manager => {
            const keyword = await this.manager.findOne(Keyword, name, { relations: ["questions"] });
            if(!keyword) throw new NotFoundException(`Keyword ${name} not found`);
            manager.merge(Keyword, keyword, updateKeywordDto);
            return manager.save(keyword);
        });
    }

    remove(name: string) : Promise<void> {
        return this.manager.transaction(async manager => {
            const keyword = await manager.findOne(Keyword, name);
            if(!keyword) throw new NotFoundException(`Keyword ${name} not found`);
            await manager.delete(Keyword, name);
        });
    }
}

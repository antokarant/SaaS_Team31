import { CreateKeywordDto } from './dto/create-keyword.dto';
import { UpdateKeywordDto } from './dto/update-keyword.dto';
import { Keyword } from './entities/keyword.entity';
import { EntityManager } from 'typeorm';
export declare class KeywordService {
    private manager;
    constructor(manager: EntityManager);
    create(createKeywordDto: CreateKeywordDto): Promise<Keyword>;
    findAll(): Promise<Keyword[]>;
    findOne(name: string): Promise<Keyword>;
    findMostPopular(): Promise<Keyword[]>;
    update(name: string, updateKeywordDto: UpdateKeywordDto): Promise<Keyword>;
    remove(name: string): Promise<void>;
}

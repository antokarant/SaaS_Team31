import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class QuestionService {

    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createQuestionDto: CreateQuestionDto) : Promise<Question> { // typescript requires specification of return type
        const question = await this.manager.create(Question, createQuestionDto); // createQuestionDto is a subtype of question
        return this.manager.save(question); // returns a promise for the quiz as it was saved in the database
        // not returning question after saving because the promise includes the automatically generated id (by the orm)
    }

    async findAll() : Promise<Question[]> {
        return this.manager.find(Question); // does not need await, returns promise
    }

    async findOne(id: number) : Promise<Question> {
        const result = await this.manager.findOne(Question, id, { relations: ["answers"] }); // the additional option joins tables and returns the correpsonding answers too
        if(!result) throw new NotFoundException(`Question ${id} not found`);
        return result;
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto) : Promise<Question> {
        // very important that the process be atomic, that is, account for the fact that the data might change during the update (bank accounts etc)
        return this.manager.transaction(async manager => {
            const question = await this.manager.findOne(Question, id, { relations: ["answers"] });
            if(!question) throw new NotFoundException(`Question ${id} not found`);
            manager.merge(Question, question, updateQuestionDto);
            return manager.save(question);
        });
    }

    remove(id: number) : Promise<void> {
        return this.manager.transaction(async manager => {
            const question = await manager.findOne(Question, id);
            if(!question) throw new NotFoundException(`Question ${id} not found`);
            await manager.delete(Question, id);
        });
    }
}

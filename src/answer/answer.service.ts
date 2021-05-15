import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';

@Injectable()
export class AnswerService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const questionID = createAnswerDto.question.id;
            if(!questionID) throw new BadRequestException('Question id missing.');
            const question = await this.manager.findOne(Question, createAnswerDto.question.id);
            if(!question) throw new NotFoundException(`Question ${questionID} not found.`);
            const answer = await this.manager.create(Answer, createAnswerDto);
            answer.question = question;
            return this.manager.save(answer);
        });
    }

    async findAll(): Promise<Answer[]> {
        return this.manager.find(Answer, { relations: ["question"] });
    }

    async findOne(id: number): Promise<Answer> {
        const answer = await this.manager.findOne(Answer, id, { relations: ["question"] });
        if(!answer) throw new NotFoundException(`Answer ${id} not found.`);
        return answer;
    }

    async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const answer = await manager.findOne(Answer, id, { relations: ["question"] });
            if(!answer) throw new NotFoundException(`Answer ${id} not found.`);
            manager.merge(Answer, answer, updateAnswerDto);
            return manager.save(answer);
        });
    }

    async remove(id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const answer = await manager.findOne(Answer, id);
            if(!answer) throw new NotFoundException(`Answer ${id} not found.`);
            await manager.delete(Answer, id);
        });
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Answer } from './entities/answer.entity';
import { Question } from '../question/entities/question.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AnswerService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
        return this.manager.transaction(async manager => {
            const questionID = createAnswerDto.question.id;
            if(!questionID) throw new BadRequestException('Question id missing.');
            const question = await this.manager.findOne(Question, createAnswerDto.question.id);
            if(!question) throw new NotFoundException(`Question ${questionID} not found.`);

            const userID = createAnswerDto.user.id;
            if(!userID) throw new BadRequestException('User id missing.');
            const user = await this.manager.findOne(User, createAnswerDto.user.id);
            if(!user) throw new NotFoundException(`User ${userID} not found.`);

            const answer = await this.manager.create(Answer, createAnswerDto);

            answer.question = question;
            answer.user = user;

            // SOURCE: https://github.com/typeorm/typeorm/blob/master/docs/entity-manager-api.md
            let c = question.answerCount + 1;
            await this.manager.update(Question, questionID, { answerCount: c });
            return this.manager.save(answer);
        });
    }

    async findAll(id) {
        //return this.manager.find(Answer, { relations: ["question"] });
        const result = await this.manager.createQueryBuilder('answer', 'answer')
        .leftJoinAndSelect('answer.user', 'user')
        .leftJoinAndSelect('answer.question', 'question')
        .leftJoinAndSelect('answer.comments', 'comments')
        .where('answer.userID = :id', {id})
        .orderBy('answer.createdOn', 'DESC')
        .getMany()
        console.log(result)
        return result

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
            await manager.update(Question, answer.question.id, { answerCount: answer.question.answerCount - 1 });
            await manager.delete(Answer, id);
        });
    }
}

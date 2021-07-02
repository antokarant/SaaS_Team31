import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { User } from '../user/entities/user.entity';
import { Keyword } from '../keyword/entities/keyword.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class QuestionService {
    constructor(@InjectEntityManager() private manager: EntityManager) {}

    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const userID = createQuestionDto.user.id;
            if(!userID) throw new BadRequestException('User id missing.');
            const user = await this.manager.findOne(User, createQuestionDto.user.id);
            if(!user) throw new NotFoundException(`User ${userID} not found.`);

            let keywordList = [];
            for(const kw of createQuestionDto.keywords)
            {
                const keywordName = kw.name;
                if(!keywordName) throw new BadRequestException('Keyword name missing.');
                const keyword = await this.manager.findOne(Keyword, keywordName);
                if(!keyword) throw new NotFoundException(`Keyword ${keywordName} not found.`);
                keywordList.push(keyword);
            }

            const question = await this.manager.create(Question, createQuestionDto);
            question.user = user;
            question.keywords = keywordList;
            return this.manager.save(question);
        });
    }

    async findAll(id) {
        const result = await this.manager.createQueryBuilder('question', 'question')
        .leftJoinAndSelect('question.user', 'user')
        .leftJoinAndSelect('question.answers', 'answers')
        .where('question.userID = :id', {id})
        .getMany()
        //return this.manager.find(Question, { relations: ["user", "keyword"] });
        return result;
    }

    async findOne(id: number): Promise<Question> {
        const question = await this.manager.findOne(Question, id, { relations: ["user", "keywords"] });
        if(!question) throw new NotFoundException(`Question ${id} not found.`);
        return question;
    }

    async update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
        return this.manager.transaction(async manager => {
            const question = await manager.findOne(Question, id, { relations: ["user", "keywords"] });
            if(!question) throw new NotFoundException(`Question ${id} not found.`);
            manager.merge(Question, question, updateQuestionDto);
            return manager.save(question);
        });
    }

    async remove(id: number): Promise<void> {
        return this.manager.transaction(async manager => {
            const question = await manager.findOne(Question, id);
            if(!question) throw new NotFoundException(`Question ${id} not found.`);
            await manager.delete(Question, id);
        });
    }
}

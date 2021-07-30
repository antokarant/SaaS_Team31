import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { EntityManager } from 'typeorm';
export declare class QuestionService {
    private manager;
    constructor(manager: EntityManager);
    create(createQuestionDto: CreateQuestionDto): Promise<Question>;
    findAllUser(id: any): Promise<unknown[]>;
    findAll(): Promise<Question[]>;
    findAllLatest(): Promise<Question[]>;
    findUnanswered(): Promise<Question[]>;
    findMostPopular(): Promise<Question[]>;
    findAllKeyword(keyword: any): Promise<any[]>;
    findOne(id: number): Promise<Question>;
    update(id: number, updateQuestionDto: UpdateQuestionDto): Promise<Question>;
    remove(id: number): Promise<void>;
}

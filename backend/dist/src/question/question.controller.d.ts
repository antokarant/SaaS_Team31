import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto, req: any): Promise<import("./entities/question.entity").Question>;
    findAllUser(req: any): Promise<unknown[]>;
    findAll(): Promise<import("./entities/question.entity").Question[]>;
    findAllLatest(): Promise<import("./entities/question.entity").Question[]>;
    findUnanswered(): Promise<import("./entities/question.entity").Question[]>;
    findMostPopular(): Promise<import("./entities/question.entity").Question[]>;
    findOne(id: string): Promise<import("./entities/question.entity").Question>;
    findKeyword(word: string): Promise<any[]>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<import("./entities/question.entity").Question>;
    remove(id: string): Promise<void>;
}

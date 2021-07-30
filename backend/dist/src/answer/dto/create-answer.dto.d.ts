import { Question } from '../../question/entities/question.entity';
export declare class CreateAnswerDto {
    readonly text: string;
    readonly question: Question;
    user: any;
}

import { Question } from '../../question/entities/question.entity';

export class CreateAnswerDto {
    readonly text: string;
    readonly positiveVotes: number;
    readonly negativeVotes: number;
    readonly question: Question;
}

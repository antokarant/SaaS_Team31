import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';

export class CreateAnswerDto {
    readonly text: string;
    readonly positiveVotes: number;
    readonly negativeVotes: number;
    readonly question: Question;
    readonly user: User;
}

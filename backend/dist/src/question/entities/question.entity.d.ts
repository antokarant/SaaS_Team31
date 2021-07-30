import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';
export declare class Question {
    id: number;
    createdOn: Date;
    updatedOn: Date;
    title: string;
    description: string;
    upvotes: number;
    downvotes: number;
    answerCount: number;
    answers: Answer[];
    user: User;
    keywords: Keyword[];
}

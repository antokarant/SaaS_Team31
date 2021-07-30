import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';
export declare class Comment {
    id: number;
    createdOn: Date;
    updatedOn: Date;
    text: string;
    upvotes: number;
    downvotes: number;
    answer: Answer;
    user: User;
}

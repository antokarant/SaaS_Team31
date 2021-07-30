import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class Answer {
    id: number;
    createdOn: Date;
    updatedOn: Date;
    text: string;
    upvotes: number;
    downvotes: number;
    question: Question;
    user: User;
    comments: Comment[];
}

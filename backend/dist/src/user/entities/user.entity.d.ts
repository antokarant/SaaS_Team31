import { Question } from '../../question/entities/question.entity';
import { Answer } from '../../answer/entities/answer.entity';
import { Comment } from '../../comment/entities/comment.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    createdOn: Date;
    updatedOn: Date;
    questions: Question[];
    answers: Answer[];
    comments: Comment[];
}

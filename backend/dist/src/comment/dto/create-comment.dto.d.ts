import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';
export declare class CreateCommentDto {
    readonly text: string;
    readonly answer: Answer;
    readonly user: User;
}

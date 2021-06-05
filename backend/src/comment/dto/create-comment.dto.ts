import { IsString, IsNotEmpty } from 'class-validator';
import { Answer } from '../../answer/entities/answer.entity';
import { User } from '../../user/entities/user.entity';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    readonly text: string;

    readonly answer: Answer;
    readonly user: User;
}

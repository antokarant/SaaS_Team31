import { IsString, IsNotEmpty } from 'class-validator';
import { Question } from '../../question/entities/question.entity';
import { User } from '../../user/entities/user.entity';

export class CreateAnswerDto {
    @IsString()
    @IsNotEmpty()
    readonly text: string;

    @IsNotEmpty()
    readonly question : Question;
    user: any;
}

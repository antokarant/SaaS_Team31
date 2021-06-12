// Dtos typically should be verified
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Keyword } from '../../keyword/entities/keyword.entity';

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    readonly user: User;
    //@IsOptional()
    readonly keywords: Keyword[];
}

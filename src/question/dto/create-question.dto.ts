// Dtos typically should be verified
//import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateQuestionDto {
  //@IsString()
  //@IsNotEmpty()
  readonly title: string;

  readonly user: User;
}

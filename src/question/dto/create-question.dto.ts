// Dtos typically should be verified
//import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  //@IsString()
  //@IsNotEmpty()
  readonly title: string;
}

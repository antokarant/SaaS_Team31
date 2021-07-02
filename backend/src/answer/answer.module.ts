import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { UserService } from 'src/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    controllers: [AnswerController],
    providers: [AnswerService, UserService]
})
export class AnswerModule {}

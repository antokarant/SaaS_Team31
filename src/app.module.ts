import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerModule } from './answer/answer.module';
import { UserModule } from './user/user.module';
import { KeywordModule } from './keyword/keyword.module';

@Module({
  imports: [
      QuestionModule,
      TypeOrmModule.forRoot(),
      AnswerModule,
      UserModule,
      KeywordModule // uses ormconfig.json
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordModule } from './keyword/keyword.module';

import { AuthModule } from './auth.module';
import { JwtAuthGuard } from './jwt-auth.guard';




@Module({
    imports: [
        QuestionModule,
        TypeOrmModule.forRoot(),
        KeywordModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer){
        consumer

    }
}

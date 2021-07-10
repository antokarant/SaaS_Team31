import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth.module';
import { JwtAuthGuard } from './jwt-auth.guard';




@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
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

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@core/config/config.service';
import { FirebaseService } from '@core/firebase/firebase.service';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), PostsModule, UsersModule],
  controllers: [AppController],
})
export class AppModule { }

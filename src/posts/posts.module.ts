import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseService } from '@core/firebase/firebase.service';
import { configService } from '@core/config/config.service';
import { PinoLoggerService } from '@core/logger/logger.service';
import { Posts } from './entities/posts.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { PostsRepository } from './repositories/posts.repository';
import { UtilsService } from '@common/utils/utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts], configService.getDataBaseName())],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository, FirebaseService, PinoLoggerService, UtilsService],
  exports: [PostsService, PostsRepository, FirebaseService, PinoLoggerService, UtilsService],
})
export class PostsModule { }

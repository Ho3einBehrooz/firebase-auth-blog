import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@core/config/config.service';
import { AppController } from './app.controller';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), PostsModule],
  controllers: [AppController],
})
export class AppModule {}

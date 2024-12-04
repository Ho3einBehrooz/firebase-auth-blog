import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { FirebaseService } from '@core/firebase/firebase.service';
import { PinoLoggerService } from '@core/logger/logger.service';
import { UsersService } from './users/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FirebaseService, PinoLoggerService],
  exports: [UsersService, FirebaseService, PinoLoggerService],
})
export class UsersModule { }

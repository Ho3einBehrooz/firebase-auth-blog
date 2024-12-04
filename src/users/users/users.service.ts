import { Injectable, BadRequestException } from "@nestjs/common";
import { FirebaseService } from "@core/firebase/firebase.service";
import { PinoLoggerService } from '@core/logger/logger.service';
import { CreateUserDto } from "../dtos/create.dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly loggerService: PinoLoggerService,
  ) { }

  async createUser(dto: CreateUserDto): Promise<any> {
    const { email, password, firstName, lastName, role } = dto;
    const app = this.firebaseService.setup();

    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${firstName} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });

      return createdUser;
    } catch (error) {
      this.loggerService.error(error);
      throw new BadRequestException(error.message);
    }
  }

  createToken(userId: string) {
    const app = this.firebaseService.setup();

    return app.auth().createCustomToken(userId);
  }

  async GetUidFromToken(token: string) {
    const app = this.firebaseService.setup();

    const decodedToken = await app.auth().verifyIdToken(token);

    return decodedToken.uid;
  }
}

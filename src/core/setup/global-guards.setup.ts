import { Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { RolesGuard } from '@core/guards/roles.guard';
import { FirebaseService } from "@core/firebase/firebase.service";

const setupGlobalGuards = (app: NestExpressApplication) => {
  const firebaseService = app.get(FirebaseService);
  app.useGlobalGuards(new RolesGuard(new Reflector(), firebaseService));
};

export default setupGlobalGuards;

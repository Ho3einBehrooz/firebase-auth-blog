import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin";
import { configService } from "@core/config/config.service";

let app: admin.app.App = null;

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    if (!app) {
      const firebaseServiceAccountFile = Buffer.from(configService.getFirebaseBase64Config(), 'base64').toString('utf-8');
      const serviceAccount = await JSON.parse(firebaseServiceAccountFile);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }

  setup() {
    return app;
  }
}
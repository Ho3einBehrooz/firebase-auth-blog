import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FirebaseService } from "@core/firebase/firebase.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly firebaseService: FirebaseService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let accesses = [];
    accesses = this.reflector.get<[]>('access', context.getHandler()) || [];

    if (accesses[0] === 'NONE')
      return Promise.resolve(true);

    try {
      const app = this.firebaseService.setup();
      const idToken = context.getArgs()[0]?.headers?.authorization.split(" ")[1];

      const claims = await app.auth().verifyIdToken(idToken);
      const roles: string[] = claims.role;
      if (roles.some(role => accesses.includes(role)))
        return true

      throw new UnauthorizedException();
    } catch (error) {
      console.error("Error", error);
      throw new UnauthorizedException();
    }
  }
}
// Firebase-admin を利用した NestJS 用の Strategy を作成します。

import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy,ExtractJwt } from 'passport-jwt';
import { FirebaseService } from '../config/firebase.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy,"firebase-auth") {
  constructor(
    private  firebaseService: FirebaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "Hogehoge",
    });
  }

  async validate(jwtToken: string) {
    try {
      const auth = this.firebaseService.getAuth();
      const payload = await auth.verifyIdToken(jwtToken);
      const user = await auth.getUser(payload.uid);
      if (user.disabled) {
        throw new ForbiddenException();
      }
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

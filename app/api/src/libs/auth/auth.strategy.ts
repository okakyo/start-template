// Firebase-admin を利用した NestJS 用の Strategy を作成します。

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }

  async validate(payload: string) {
    try {
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

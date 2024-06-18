import { Global, Module } from '@nestjs/common';
import { FirebaseService } from '../libs/config/firebase.service';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from 'src/libs/auth/auth.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase-auth' })],
  providers: [AuthStrategy, FirebaseService],
  exports: [],
})
export class FirebaseModule {}

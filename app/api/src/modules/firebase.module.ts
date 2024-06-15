import { Global,Module } from '@nestjs/common';
import { FirebaseService } from '../libs/config/firebase.service';

@Global()
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService]
})

export class FirebaseModule {}

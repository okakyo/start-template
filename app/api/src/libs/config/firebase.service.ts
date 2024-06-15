import {
  Injectable,
 } from "@nestjs/common";
import * as firebase from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

@Injectable()
export class FirebaseService {
  private firebaseApp: firebase.app.App;
  
}

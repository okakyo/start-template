import {
  Injectable,
 } from "@nestjs/common";
import firebase from "firebase-admin";

@Injectable()
export class FirebaseService {
  constructor() {}
  getAuth() {
    return firebase.auth();
  }
}

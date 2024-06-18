import {
  Injectable,
 } from "@nestjs/common";
import firebase from "firebase-admin";
import { App, initializeApp } from "firebase-admin/app"
import {getAuth} from "firebase-admin/auth"
@Injectable()
export class FirebaseService {
  constructor() {}
  getAuth() {
    return firebase.auth();
  }
}

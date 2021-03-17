import { Injectable, NgZone } from '@angular/core';
// import { User } from "../services/user";
// import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from '../interfaces/user.interface';
import { ToastGlobalService } from './toast-global.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public toastService: ToastGlobalService,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    /* Saving user data in sessionStorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        sessionStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(sessionStorage.getItem('user'));
      } else {
        sessionStorage.setItem('user', null);
        JSON.parse(sessionStorage.getItem('user'));
      }
    })
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        console.log('error is', error);
        this.toastService.error(error.message);
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
        this.router.navigate(['dashboard']);
      }).catch((error) => {
        this.toastService.error(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    (await this.afAuth.currentUser).sendEmailVerification().then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastService.success('Password reset email sent, check your inbox.');

      }).catch((error) => {
        this.toastService.error(error.message);
      })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(sessionStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.signOut().then(() => {
      sessionStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}
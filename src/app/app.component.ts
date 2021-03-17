import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mofood';

  constructor(protected router: Router, public authService: AuthService) { }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToProfile() {
    this.router.navigateByUrl('/profile');
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  signOut(){
    this.authService.SignOut();
  }
  
  goToForgotpassword(){
    this.router.navigateByUrl('/forgot-password');

  }
}

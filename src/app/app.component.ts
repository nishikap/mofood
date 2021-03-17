import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mofood';

  constructor(protected router: Router) { }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToCart() {
    this.router.navigateByUrl('/cart');
  }

  goToProfile(){
    this.router.navigateByUrl('/profile');

  }
  goToForgotpassword(){
    this.router.navigateByUrl('/forgot-password');

  }
}

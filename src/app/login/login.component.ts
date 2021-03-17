import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.SignIn(this.loginForm.get('email').value, this.loginForm.get('password').value)
  }

}

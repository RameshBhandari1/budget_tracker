import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {LoginRequestModel} from "../models/login-request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  showPassword: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    // Initialize the login form
    this.buildForm();
  }

  // Getter for form controls to access them in template
  get form(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  // Form builder to create form controls and form group
  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  // Method to handle user login request
  onUserLogin() {
    const loginRequestModel: LoginRequestModel = this.loginForm.value;
    this.authService.checkLogin(loginRequestModel);
  }

  // Method to navigate to signup page
  routeToSignup() {
    this.router?.navigate(['/auth/sign-up'])
  }

  // Method to toggle password visibility
  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }
}

import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserModel} from "../../core-module/models/user.model";
import {Router} from "@angular/router";
import {ApplicationConstants} from "../../core-module/constants/application-constants";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  showPassword: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    // Build signup form with validation rules.
    this.buildForm();
  }

  // Getter for form controls to access form values and errors.
  get form(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  // Build signup form with required fields and password validation.
  buildForm() {
    this.signupForm = this.formBuilder.group({
      fullName: [undefined, [Validators.required]],
      email: [undefined, [Validators.required]],
      password: [undefined, [Validators.required]]
    });
  }

  // Submit the form to register a new user.
  onUserRegister() {
    this.submitted = true;
    // If form is invalid, return early.  Otherwise, submit the form.  We only submit if the form is valid.
    if (this.signupForm.invalid) {
      return;
    }

    // Create a UserModel object from the form values.  Then, call the AuthService's save method to register the user.
    const userModel: UserModel = this.signupForm.value;
    this.authService.save(ApplicationConstants.USERS, userModel).subscribe((res: any) => {
      alert(res?.message);
      if (res?.success) {
        this.routeToLogin();
      }
    });
  }

  // Navigate to the login page.
  routeToLogin() {
    this.router?.navigate(['/auth/login']);
  }

  // Method to toggle password visibility
  onPasswordToggle() {
    this.showPassword = !this.showPassword;
  }
}

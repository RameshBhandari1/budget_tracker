import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import {CoreModule} from "../core-module/core.module";
import {AuthRoutingModule} from "./auth-routing.module";
import { AuthComponent } from './auth/auth.component';


@NgModule({
  declarations: [
    // Declares Components
    LoginComponent,
    RegistrationComponent,
    AuthComponent
  ],
  imports: [
    CommonModule, // Imports CommonModule for common Angular directives.
    CoreModule, // Imports CoreModule for core application functionalities and services
    AuthRoutingModule // Imports AuthRoutingModule for routing related to the Auth module
  ]
})
export class AuthModule { }

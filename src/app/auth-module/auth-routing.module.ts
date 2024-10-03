import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
  {
    // Base path for the Auth module
    path: '',
    component: AuthComponent,
    children: [
      {
        // Default path when navigating to the Auth module
        path:'',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        // Renders the LoginComponent at the 'login' route
        path: 'login',
        component: LoginComponent,
        data : {title: 'Login Details', ModuleName: 'Auth Module'}
      },
      {
        // Renders the RegistrationComponent at the 'sign-up' route
        path: 'sign-up',
        component: RegistrationComponent,
        data : {title: 'Registration Details', ModuleName: 'Auth Module'}
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Registers the routes
  exports: [RouterModule] // Exports the RouterModule
})
export class AuthRoutingModule { }

import {CanActivateFn, Router} from '@angular/router';
import {ApplicationConstants} from "../constants/application-constants";
import {inject} from "@angular/core";

export const loginGuard: CanActivateFn = (route, state) => {
  // Inject the Router instance using Angular's dependency injection
  const router = inject(Router);
  // Check if a user is authenticated
  const isAuthenticated = localStorage.getItem(ApplicationConstants.CURRENT_USER)

  // If the user is authenticated, redirect them to the home page ('/') by returning a UrlTree
  // If the user is not authenticated, allow access to the login page by returning true
  return isAuthenticated ? router.createUrlTree(['/']) : true;
};

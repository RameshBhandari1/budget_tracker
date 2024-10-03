import {CanActivateFn, Router} from '@angular/router';
import {ApplicationConstants} from "../constants/application-constants";
import {inject} from "@angular/core";

// Define the authGuard function, which implements CanActivateFn
export const authGuard: CanActivateFn = (route, state) => {
  // Inject the Router instance using Angular's dependency injection
  const router = inject(Router);
  // Check if a user is authenticated
  const isAuthenticated = localStorage.getItem(ApplicationConstants.CURRENT_USER);

  // If the user is authenticated, return true. Otherwise, navigate to the login page
  return isAuthenticated ? true : router.navigate(['/auth/login']);
};

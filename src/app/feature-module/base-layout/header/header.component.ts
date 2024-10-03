import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationConstants} from "../../../core-module/constants/application-constants";
import {LocalStorageService} from "../../../core-module/services/local-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName!: string;

  constructor(
    private localStorageService: LocalStorageService,
              private router: Router) {
  }

  ngOnInit() {
    // Getting the full name of the logged-in user from local storage and displaying it in the header
    this.fullName = this.localStorageService.getCurrentUser()?.fullName;
  }

  // Navigating to the login page after logout
  onLogoutClick(event: any): void {
    let confirmation = confirm('Are you sure you want to logout?');
    if (confirmation) {
      // Removing the current user from local storage
      this.localStorageService.removeItemFromLocalStorage(ApplicationConstants.CURRENT_USER);
      this.router?.navigate(['auth/login']);
    }
  }
}

import {Injectable} from '@angular/core';
import {LocalStorageService} from "../../core-module/services/local-storage.service";
import {Router} from "@angular/router";
import {ApplicationConstants} from "../../core-module/constants/application-constants";
import {UserModel} from "../../core-module/models/user.model";
import {LoginResponseModel} from "../models/login-response.model";
import {LoginRequestModel} from "../models/login-request.model";
import {BaseService} from "../../core-module/services/base.service";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {

  isLogin = false;

  constructor(override readonly localStorageService: LocalStorageService,
              private router: Router) {
    // Call the constructor of BaseService with LocalStorageService
    super(localStorageService);
  }

  checkLogin(loginData: LoginRequestModel) {
    let users = this.localStorageService.getItemsFromLocalStorage(ApplicationConstants.USERS);
    if (!users.length) {
      // Show alert if no users exist
      alert("No user found!");
      return;
    }
    // Find user by email and password (Decrypt password using atob)
    let user: UserModel = users?.find((user: UserModel) => (user.email === loginData.email)
      && (atob(user.password || '') === loginData.password));
    if (user) {
      // Set login flag to true on successful authentication
      this.isLogin = true;
      const loginResponseModel: LoginResponseModel = new LoginResponseModel();
      loginResponseModel.id = user.id;
      loginResponseModel.email = user.email;
      loginResponseModel.fullName = user.fullName;
      loginResponseModel.createdDate = user.createdDate;
      // Generate token
      loginResponseModel.token = btoa(loginData?.email?.concat(new Date() + (loginData?.password || '')) || '');
      // Store login data in local storage
      this.localStorageService.setItemInLocalStorage(ApplicationConstants.CURRENT_USER, loginResponseModel);
      // Navigate to dashboard after successful login
      this.router?.navigate(['/home/dashboard']);
    } else {
      // Show alert on invalid credentials
      alert("Invalid Credential, please try again!!");
    }
  }

  save(key: any, data: any): Observable<any> {
    let allData: any[] = [];
    // Get all existing user data
    this.getAll(ApplicationConstants.USERS, UserModel)?.subscribe((res: any) => {
      allData = res?.data;
    });

    // Check if email already exists
    if (allData?.find((v?: any) => v?.email == data?.email)) {
      return of({success: false, message: 'Email already exist !'});
    }
    // Set the last modified date
    data.lastModifiedDate = new Date();
    if (data?.id) {
      // Find the index of the record to edit
      const editDataIndex = allData?.findIndex((data: any) => data.id === data?.id);
      if (editDataIndex > -1) {
        // patched created date when editing
        data.createdDate = allData[editDataIndex]?.createdDate;
        // Update the record
        allData[editDataIndex] = data;
      } else {
        // Return error if record not found
        return of({success: false, message: 'Record not found.'});
      }
    } else {
      // Assign new ID if creating a new record
      data.id = allData?.length ? (allData[allData?.length - 1]?.id + 1) : 1;
      data.createdDate = new Date();
      // Encrypt password before saving
      data.password = btoa(<string>data.password);
      allData.push(data);
    }
    // Save updated data to local storage
    localStorage.setItem(key, JSON.stringify(allData));
    // Return success response
    return of({data: allData, success: true, message: `Record saved successfully.`});
  }
}

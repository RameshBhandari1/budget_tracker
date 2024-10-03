import { Injectable } from '@angular/core';
import {ApplicationConstants} from "../constants/application-constants";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Retrieve items from local storage by key
  getItemsFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(new Array<any>()));
  }

  // Save data in local storage by key
  saveDataInLocalStorage(key: string, data: any) {
    let storageItemList: any[] = this.getItemsFromLocalStorage(key);
    storageItemList.push(data);
    localStorage.setItem(key, JSON.stringify(storageItemList));
  }

  // Get the current user object from local storage
  getCurrentUser() {
    return JSON.parse(localStorage.getItem(ApplicationConstants.CURRENT_USER) || JSON.stringify({}));
  }

  // Remove an item from local storage by key
  removeItemFromLocalStorage(key: string) {
    localStorage.removeItem(key)
  }

  // Set an item in local storage with a specified key and data
  setItemInLocalStorage(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

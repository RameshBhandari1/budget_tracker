import {Injectable} from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {

  // Subject to emit when an item is deleted
  protected itemDeletedSubject = new Subject<void>();
  // Observable that other services can subscribe to
  itemDeleted$ = this.itemDeletedSubject.asObservable();

  protected constructor(protected localStorageService: LocalStorageService) {
  }

  // Retrieve all data from local storage by key and parse it as JSON, or return an empty array
  getAll(key: string, modelType: T): Observable<any> {
    let allData = localStorage.getItem(key);
    return of({data: (allData ? JSON.parse(allData) : new Array<typeof modelType>()), success: true});
  }

  // Retrieve one data from local storage by key and id, and parse it as JSON
  getById(id: any, key: string, modelType: T): Observable<any> {
    let finalData;
    // Get all data and find the item with the given ID
    this.getAll(key, modelType).subscribe({
      next: (res) => {
        const index = res?.data?.findIndex((v: any) => v.id == id);
        finalData = res?.data[index];
      },
      error: (error) => {
        console.error('Error fetching data:: ', error);
        throw new Error(error);
      }
    });
    return of({data: finalData, success: true});
  }

  // Find index of the item to delete by given id and update local storage
  delete(id: any, key: string, modelType: T): Observable<any> {
    const confirmMessage = confirm("Are you sure you want to delete?");
    let response;
    if (confirmMessage) {
      this.getAll(key, modelType).subscribe({
        next: (res: any) => {
          const index = res?.data?.findIndex((val: any) => val.id == id);
          if (index > -1) {
            res?.data?.splice(index, 1);
          }
          localStorage.setItem(key, JSON.stringify(res?.data));
          response = {success: true, message: 'Record deleted successfully.'};
          // Emit event after the deletion is successful
          this.itemDeletedSubject.next();
        },
        error: (err) => {
          response = {success: false, message: `Data not found:: ${err}`};
        }
      });
    } else {
      response = {success: false, message: `Record not deleted.`};
    }
    return of(response);
  }

  // Retrieve all data from local storage by key and current userId
  getAllDataByUser(key: string, modelType: T): Observable<any> {
    const currentUser = this.localStorageService.getCurrentUser();
    let finalData;
    this.getAll(key, modelType).subscribe({
      next: (res) => {
        finalData = res?.data?.filter((v: any) => v.userId == currentUser?.id);
      },
      error: (error) => {
        console.error('Error fetching data:: ', error);
        throw new Error(error);
      }
    });
    return of({success: true, message: `Data not found`, data: finalData});
  }
}

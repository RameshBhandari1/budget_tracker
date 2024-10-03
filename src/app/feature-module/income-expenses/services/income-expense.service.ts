import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {BaseService} from "../../../core-module/services/base.service";
import {LocalStorageService} from "../../../core-module/services/local-storage.service";
import {ApplicationConstants} from "../../../core-module/constants/application-constants";
import {IncomesExpensesModel} from "../models/incomes-expenses.model";
import {IncomeExpenseResponseModel} from "../models/income-expense-response.model";
import {TotalDashboardCountModel} from "../models/total-dashboard-count.model";

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService extends BaseService<any> {

  constructor(override readonly localStorageService: LocalStorageService) {
    // Calling the parent constructor with the local storage service
    super(localStorageService);
  }

  // Method to save a new record or update an existing one
  save(key: string, data: any): Observable<any> {
    let allData: any[] = [];
    // Fetching all existing records
    this.getAll(key, ApplicationConstants.INCOMES_EXPENSES)?.subscribe((res: any) => {
      allData = res?.data;
    });
    // Updating the last modified date
    data.lastModifiedDate = new Date();
    // If the record has an ID, it means we are updating it
    if (data?.id) {
      const editDataIndex = allData?.findIndex((val: any) => val.id == data?.id);
      if (editDataIndex > -1) {
        data.createdDate = allData[editDataIndex]?.createdDate;
        data.userId = allData[editDataIndex]?.userId;
        // Updating the record in allData
        allData[editDataIndex] = data;
      } else {
        return of({success: false, message: 'Record not found.'});
      }
    } else {
      // If there is no ID, we are adding a new record
      data.id = allData?.length ? (allData[allData?.length - 1]?.id + 1) : 1;
      data.userId = this.localStorageService.getCurrentUser() ? this.localStorageService.getCurrentUser()?.id : null;
      data.createdDate = new Date();
      // Adding the new record to allData
      allData.push(data);
    }

    // Saving the updated data back to local storage
    localStorage.setItem(key, JSON.stringify(allData));

    // Returning success message
    return of({success: true, message: `Record save successfully.`, data: allData});
  }

  // Method to get all incomes and expenses
  getAllIncomesAndExpenses(key: string, modelType: any): Observable<any> {
    const finalData: any = {
      incomes: new Array<IncomeExpenseResponseModel>,
      expenses: new Array<IncomeExpenseResponseModel>
    };

    this.getAllDataByUser(key, modelType).subscribe({
      next: (res) => {
        res?.data?.forEach((item: any) => {
          const incomeExpenseResponseModel: IncomeExpenseResponseModel = new IncomeExpenseResponseModel();
          incomeExpenseResponseModel.id = item.id;
          incomeExpenseResponseModel.title = item.title;
          incomeExpenseResponseModel.incomeType = item.incomeType;
          incomeExpenseResponseModel.recurringType = item.recurringType;
          incomeExpenseResponseModel.createdDate = item.createdDate;
          incomeExpenseResponseModel.amount = item.amount;

          // Pushing the item into the respective array based on income type
          if (item.incomeType === ApplicationConstants.INCOMES) {
            finalData.incomes.push(incomeExpenseResponseModel);
          } else if (item.incomeType === ApplicationConstants.EXPENSES) {
            finalData.expenses.push(incomeExpenseResponseModel);
          }
        });
      },
      error: () => {
        return of({success: false, message: `Error fetching data.`});
      }
    });

    // Returning the fetched data
    return of({success: true, message: `Data fetched successfully.`, data: finalData});
  }

  // Method to get total calculations for dashboard
  getTotalCalculations(): Observable<any> {
    const totalDashboardCount: TotalDashboardCountModel = new TotalDashboardCountModel();
    this.getAllIncomesAndExpenses(ApplicationConstants.INCOMES_EXPENSES, IncomesExpensesModel).subscribe({
      next: (res) => {
        if (res?.success) {
          // Calculating total incomes and expenses
          totalDashboardCount.totalIncomes = res?.data?.incomes?.reduce((acc: any, curr: any) => Number(acc) + Number(curr.amount), 0);
          totalDashboardCount.totalExpenses = res?.data?.expenses?.reduce((acc: any, curr: any) => Number(acc) + Number(curr.amount), 0);
          totalDashboardCount.mainBalance = Number(totalDashboardCount.totalIncomes) - Number(totalDashboardCount.totalExpenses);
        }
      },
      error: () => {
        alert(`Error fetching data.`);
      }
    });

    // Returning total calculations
    return of({success: true, message: `Data fetched successfully.`, data: totalDashboardCount});
  }
}

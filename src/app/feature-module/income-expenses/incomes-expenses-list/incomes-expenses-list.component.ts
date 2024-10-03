import {Component, OnInit} from '@angular/core';
import {IncomeExpenseService} from "../services/income-expense.service";
import {ApplicationConstants} from "../../../core-module/constants/application-constants";
import {IncomesExpensesModel} from "../models/incomes-expenses.model";
import {Router} from "@angular/router";
import {IncomeExpenseResponseModel} from "../models/income-expense-response.model";
import {IncomeType} from "../../../core-module/enums/income-type";
import {RecurringType} from "../../../core-module/enums/recurring-type";
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {IncomeExpensesDetailsComponent} from "../income-expenses-details/income-expenses-details.component";

@Component({
  selector: 'app-incomes-expenses-list',
  templateUrl: './incomes-expenses-list.component.html',
  styleUrls: ['./incomes-expenses-list.component.scss']
})
export class IncomesExpensesListComponent implements OnInit {
  // Array to hold records
  data: any = {
    incomes: new Array<IncomeExpenseResponseModel>,
    expenses: new Array<IncomeExpenseResponseModel>
  };
  objectData = Object.keys(this.data);
  applicationConstants = ApplicationConstants;
  p1 = 1; // Pagination variable for incomes
  p2 = 1; // Pagination variable for expenses

  // search params
  searchParams: any = {
    incomes: {
      title: null,
      recurringTypeValue: null,
      startDate: null,
      endDate: null
    },
    expenses: {
      title: null,
      recurringTypeValue: null,
      startDate: null,
      endDate: null
    }
  };

  // Getting enum value as key-value pair
  incomeType = IncomeType.enumObject();
  recurringType = RecurringType.enumObject();

  constructor(
    private incomeExpensesService: IncomeExpenseService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    // Fetching incomes and expenses on initialization
    this.getIncomesAndExpenses();
  }

  // Fetch income and expenses
  getIncomesAndExpenses() {
    this.incomeExpensesService.getAllIncomesAndExpenses(ApplicationConstants.INCOMES_EXPENSES, IncomeExpenseResponseModel).subscribe({
      next: (response: any) => {
        this.data = response?.data;
      }
    });
  }

  // Deleting income and expenses by id
  onDeleteRecord(id: any) {
    this.incomeExpensesService.delete(id, ApplicationConstants.INCOMES_EXPENSES, IncomesExpensesModel).subscribe({
      next: (response: any) => {
        if (response?.success) {
          alert(response?.message);
          this.getIncomesAndExpenses();
        }
      }
    });
  }

  // Navigating to the edit page for the selected income/expense
  editItem(incomeId: any) {
    this.router?.navigate(['home/edit-income-expense', incomeId]);
  }

  // Clearing selected date from search parameters
  clearDate(event: any, obj: any) {
    event.stopPropagation();
    this.searchParams[obj].startDate = null;
    this.searchParams[obj].endDate = null;
  }

  // Opening modal for income/expense details
  viewDetails(data: any) {
    const option: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      animation: true,
      size: 'lg'
    };
    const modalRef = this.modalService.open(IncomeExpensesDetailsComponent, option);
    // Passing the selected item's ID to the modal
    modalRef.componentInstance.id = data.id;
  }
}

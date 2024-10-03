import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IncomeExpenseService} from "../services/income-expense.service";
import {IncomesExpensesModel} from "../models/incomes-expenses.model";
import {ApplicationConstants} from "../../../core-module/constants/application-constants";

@Component({
  selector: 'app-income-expenses-details',
  templateUrl: './income-expenses-details.component.html',
  styleUrls: ['./income-expenses-details.component.scss']
})
export class IncomeExpensesDetailsComponent implements OnInit {
  // Input property to receive the ID of the income/expense item
  @Input() id: any;

  data: IncomesExpensesModel = new IncomesExpensesModel();

  constructor(private modelService: NgbModal,
              private incomeExpenseService: IncomeExpenseService) {
  }

  ngOnInit() {
    // Fetching data by ID
    this.incomeExpenseService.getById(this.id, ApplicationConstants.INCOMES_EXPENSES, IncomesExpensesModel).subscribe({
      next: (res: any) => {
        if (res?.success) {
          this.data = res?.data; // Assigning fetched data
        } else {
          console.log(res?.message);
        }
      }, error: (err: any) => {
        alert(err?.message);
      }
    })
  }

  // Method to close the modal
  onClose() {
    this.modelService.dismissAll();
  }
}

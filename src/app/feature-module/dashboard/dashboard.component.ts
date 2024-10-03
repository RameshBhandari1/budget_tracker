import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IncomeExpenseService} from "../income-expenses/services/income-expense.service";
import {TotalDashboardCountModel} from "../income-expenses/models/total-dashboard-count.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalDashboardCount: TotalDashboardCountModel = new TotalDashboardCountModel();

  constructor(private router: Router,
              private incomeExpensesService: IncomeExpenseService) {
  }

  ngOnInit() {
    // Fetching total calculations on component initialization
    this.getTotalCalculations();
    // Subscribe to the deletion event
    this.incomeExpensesService.itemDeleted$.subscribe(() => {
      // Re-fetching total calculations after an item deletion
      this.getTotalCalculations();
    });
  }

  // Navigating to the add income/expense page
  addIncomeExpenses() {
    this.router?.navigate(['home/add-income-expense'])
  }

  // Updating totalDashboardCount with the response data
  private getTotalCalculations() {
    this.incomeExpensesService.getTotalCalculations().subscribe((response: any) => {
      if (response?.success) {
        this.totalDashboardCount = response?.data;
      }
    });
  }
}

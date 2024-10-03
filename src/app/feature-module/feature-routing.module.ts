import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BaseLayoutComponent} from "./base-layout/base-layout.component";
import {authGuard} from "../core-module/guards/auth.guard";
import {AddIncomeExpensesComponent} from "./income-expenses/add-income-expenses/add-income-expenses.component";
import {IncomesExpensesListComponent} from "./income-expenses/incomes-expenses-list/incomes-expenses-list.component";

const routes: Routes = [
  {
    // Base layout component for the feature module
    path: '', component: BaseLayoutComponent,
    // Guard to protect child routes
    canActivateChild: [authGuard],
    children: [
      {
        // Component to display dashboard
        path: 'dashboard',
        component: DashboardComponent,
        data : {title: 'Dashboard', ModuleName: 'Feature Module'},
        children: [
          {
            // Default path for the dashboard
            path: '',
            component: IncomesExpensesListComponent,
            data : {title: 'List of Incomes and Expenses', ModuleName: 'Feature Module'}
          }
        ]
      },
      {
        // Path for adding income/expense
        path: 'add-income-expense',
        component: AddIncomeExpensesComponent,
        data : {title: 'Add Incomes and Expenses', ModuleName: 'Feature Module'}
      },
      {
        // Path for editing income/expense with an ID parameter
        path: 'edit-income-expense/:id',
        component: AddIncomeExpensesComponent,
        data : {title: 'Edit Incomes and Expenses', ModuleName: 'Feature Module'}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }

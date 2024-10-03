import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddIncomeExpensesComponent} from "./add-income-expenses/add-income-expenses.component";
import {IncomesExpensesListComponent} from './incomes-expenses-list/incomes-expenses-list.component';
import {CoreModule} from "../../core-module/core.module";
import {IncomeExpensesDetailsComponent} from "./income-expenses-details/income-expenses-details.component";


@NgModule({
  declarations: [
    // Declare Components
    AddIncomeExpensesComponent,
    IncomesExpensesListComponent,
    IncomeExpensesDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    AddIncomeExpensesComponent
  ]
})
export class IncomeExpensesModule {
}

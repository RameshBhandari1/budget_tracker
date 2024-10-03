import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {FeatureRoutingModule} from './feature-routing.module';
import {BaseLayoutComponent} from './base-layout/base-layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeaderComponent} from "./base-layout/header/header.component";
import {FooterComponent} from "./base-layout/footer/footer.component";
import {IncomeExpensesModule} from "./income-expenses/income-expenses.module";
import {CoreModule} from "../core-module/core.module";


@NgModule({
  declarations: [
    // Declare Components
    BaseLayoutComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FeatureRoutingModule, // Import FeatureRoutingModule
    IncomeExpensesModule, // Import IncomeExpensesModule
    NgOptimizedImage, // Import NgOptimizedImageModule
    CoreModule // Import CoreModule
  ]
})
export class FeatureModule {
}

import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {throwIfAlreadyLoaded} from "./guards/module-import-guard";
import {NumberOnlyDirective} from './directives/number-only.directive';
import {NgxPaginationModule} from "ngx-pagination";
import {SearchPipe} from './pipes/search.pipe';
import {NgSelectModule} from "@ng-select/ng-select";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from "@angular/material/icon";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyFormatPipe} from './pipes/currency-format.pipe';

// Array of shared modules for easy import and export across the application
const IMPORTS_EXPORTS = [
  CommonModule,
  HttpClientModule,
  HttpClientJsonpModule,
  FormsModule,
  ReactiveFormsModule,
  NgxPaginationModule,
  NgSelectModule,
  MatDatepickerModule,
  MatInputModule,
  MatNativeDateModule,
  MatIconModule,
  NgbModule
];

@NgModule({
  declarations: [
    NumberOnlyDirective, // Directive to restrict input to numbers only
    SearchPipe, // Pipe for filtering items based on searchObj
    CurrencyFormatPipe // Pipe for formatting numbers as currency = 'NPR'
  ],
  imports: [
    CommonModule,
    ...IMPORTS_EXPORTS // use spread operator to import all shared modules
  ],
  exports: [...IMPORTS_EXPORTS, NumberOnlyDirective, SearchPipe, CurrencyFormatPipe]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Prevent re-importing of CoreModule
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

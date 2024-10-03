import {Component, ElementRef, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IncomeType} from "../../../core-module/enums/income-type";
import {RecurringType} from "../../../core-module/enums/recurring-type";
import {IncomeExpenseService} from "../services/income-expense.service";
import {ApplicationConstants} from "../../../core-module/constants/application-constants";
import {IncomesExpensesModel} from "../models/incomes-expenses.model";

@Component({
  selector: 'app-add-income-expenses',
  templateUrl: './add-income-expenses.component.html',
  styleUrls: ['./add-income-expenses.component.scss']
})
export class AddIncomeExpensesComponent implements OnInit {

  incomeExpenses: IncomesExpensesModel = new IncomesExpensesModel();
  incomeExpensesForm: FormGroup = new FormGroup({});
  incomeType = IncomeType?.enumObject();
  recurringType = RecurringType?.enumObject();
  id!: number;
  submitted: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private incomeExpensesService: IncomeExpenseService,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    // Initialize the form
    this.buildForm();
    // Extract the 'id' parameter from the route
    this.activatedRoute.params.subscribe((res: any) => {
      this.id = res.id;
    });
    // Fetch data if an ID exists
    if (this.id) {
      this.getData();
    }
  }

  // Get access to controls
  get form(): { [key: string]: AbstractControl } {
    return this.incomeExpensesForm.controls;
  }

  private buildForm(data?: any) {
    this.incomeExpensesForm = this.formBuilder.group({
      title: [data?.title ? data?.title : undefined, [Validators.required]],
      amount: [data?.amount ? data?.amount : undefined, [Validators.required]],
      incomeType: [data?.incomeType ? data?.incomeType : undefined, [Validators.required]],
      recurringType: [data?.recurringType ? data?.recurringType : undefined, [Validators.required]],
      category: [data?.category ? data?.category : undefined, [Validators.required]],
      description: [data?.description ? data?.description : undefined]
    });
  }

  // Navigate back to the dashboard
  onBack() {
    this.router?.navigate(['/home/dashboard']);
  }

  getData() {
    this.incomeExpensesService.getById(this.id, ApplicationConstants.INCOMES_EXPENSES, IncomesExpensesModel).subscribe({
      next: (res: any) => {
        if (res?.success) {
          // Assign fetched data to incomeExpenses and patched data
          this.incomeExpenses = res?.data;
          this.incomeExpensesForm.patchValue(this.incomeExpenses);
        } else {
          // Show an alert if fetching data was unsuccessful
          alert(res?.message);
        }
      }
    })
  }

  // Save income/expense details to the local storage
  saveIncomeExpenses() {
    this.submitted = true;
    // Scroll to the first invalid control
    if (this.incomeExpensesForm.invalid) {
      this.scrollToFirstInvalidControl();
      return;
    }

    // Save income/expense details
    const incomesExpensesModel: IncomesExpensesModel = this.incomeExpensesForm.value;
    incomesExpensesModel.id = this.incomeExpenses?.id;
    this.incomeExpensesService.save(ApplicationConstants.INCOMES_EXPENSES, incomesExpensesModel).subscribe(
      (res: any) => {
        alert(res?.message);
        if (res?.success) {
          this.router?.navigate(['/home/dashboard']);
        }
      });
  }

  // Scroll to the first invalid control on form submission
  scrollToFirstInvalidControl() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form .ng-invalid" // Select the first invalid control
    );
    window.scroll({
      top: this.getTopOffset(firstInvalidControl),
      left: 0,
      behavior: "smooth"
    });
  }

  // Calculate the top offset for scrolling to the first invalid control
  getTopOffset(controlEl: HTMLElement): number {
    const labelOffset = 300;
    return controlEl.getBoundingClientRect().top + window.scrollY - labelOffset;
  }
}

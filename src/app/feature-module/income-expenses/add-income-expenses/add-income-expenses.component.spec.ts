import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncomeExpensesComponent } from './add-income-expenses.component';

describe('AddIncomeExpensesComponent', () => {
  let component: AddIncomeExpensesComponent;
  let fixture: ComponentFixture<AddIncomeExpensesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncomeExpensesComponent]
    });
    fixture = TestBed.createComponent(AddIncomeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

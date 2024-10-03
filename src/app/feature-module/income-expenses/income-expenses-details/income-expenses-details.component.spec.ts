import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeExpensesDetailsComponent } from './income-expenses-details.component';

describe('IncomeExpensesDetailsComponent', () => {
  let component: IncomeExpensesDetailsComponent;
  let fixture: ComponentFixture<IncomeExpensesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomeExpensesDetailsComponent]
    });
    fixture = TestBed.createComponent(IncomeExpensesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

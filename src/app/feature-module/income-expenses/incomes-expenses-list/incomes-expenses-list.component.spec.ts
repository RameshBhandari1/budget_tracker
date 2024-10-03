import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomesExpensesListComponent } from './incomes-expenses-list.component';

describe('IncomesExpensesListComponent', () => {
  let component: IncomesExpensesListComponent;
  let fixture: ComponentFixture<IncomesExpensesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomesExpensesListComponent]
    });
    fixture = TestBed.createComponent(IncomesExpensesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

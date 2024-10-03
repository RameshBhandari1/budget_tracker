import {BaseModel} from "../../../core-module/models/Base";
import {IncomeType} from "../../../core-module/enums/income-type";
import {RecurringType} from "../../../core-module/enums/recurring-type";

// Income and Expense model for saving records
export class IncomesExpensesModel extends BaseModel{
  userId!: number;
  title!: string;
  amount!: number;
  category!: string;
  description!: string;
  incomeType!: IncomeType;
  recurringType!: RecurringType;
}

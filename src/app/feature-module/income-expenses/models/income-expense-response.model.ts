import {IncomeType} from "../../../core-module/enums/income-type";
import {RecurringType} from "../../../core-module/enums/recurring-type";

// Income and Expenses response model for table
export class IncomeExpenseResponseModel {
  id!: string;
  createdDate!: Date;
  title!: string;
  amount!: number;
  incomeType!: IncomeType;
  recurringType!: RecurringType;
}

export enum IncomeType {
  INCOMES = 'Income',
  EXPENSES = 'Expense',
}

export namespace IncomeType {
  export function values() {
    return Object.keys(IncomeType).filter(
      (income) => isNaN(income as any) && income!== 'values' && income!== 'enumObject'
    );
  }

  // Returns the array of key-value pairs as the enum object
  export function enumObject() {
    const enums: {
      key: string;
      value: IncomeType | (() => string[]) | (() => any[])
    }[] = [];
    values().forEach((elem) => {
      enums.push({
        key: elem,
        value: IncomeType[elem as keyof typeof IncomeType]
      });
    });
    return enums;
  }
}

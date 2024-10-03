export enum RecurringType {
  MONTHLY = 'Monthly',
  YEARLY = 'Yearly',
  ONE_TIME = 'One Time'
}

export namespace RecurringType {
  export function values() {
    return Object.keys(RecurringType).filter(
      (value) => isNaN(value as any) && value!== 'values' && value!== 'enumObject'
    );
  }
  // Returns the array of key-value pairs as the enum object
  export function enumObject() {
    const enums: {
      key: string;
      value: RecurringType | (() => string[]) | (() => any[])
    }[] = [];
    values().forEach((elem) => {
      enums.push({
        key: elem,
        value: RecurringType[elem as keyof typeof RecurringType]
      });
    });
    return enums;
  }
}

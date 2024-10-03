import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number | string, currencyCode: string = 'NPR'): string {
    if (value == null) return '';

    // Convert the input to a number
    const numericValue = Number(value);

    // Use Intl.NumberFormat for formatting
    let formattedValue = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2
    }).format(Math.abs(numericValue));  // Format the absolute value

    // Replace the default currency symbol with "NPR."
    formattedValue = formattedValue.replace(currencyCode, 'NPR.');

    // If the number is negative, adjust the formatting
    return numericValue < 0 ? `NPR. -${formattedValue.slice(5)}` : formattedValue;
  }
}

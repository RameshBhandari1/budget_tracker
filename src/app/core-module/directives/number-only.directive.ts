import {Directive, ElementRef, HostListener} from '@angular/core';

// Defines a custom directive that will take digit only
@Directive({
  selector: '[appNumberOnly]'
})
export class NumberOnlyDirective {
  // Regular expression allowing only numbers and a decimal point
  private regex: RegExp = new RegExp(/^\d*\.?\d*$/);
  // List of keys that are allowed
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  // ElementRef is used to access the DOM element
  constructor(private el: ElementRef) {
  }

  // Listening for 'keydown' events on the element where the directive is applied
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      // Prevent the key press if it doesn't match the regex for numbers
      event.preventDefault();
    }
  }

}

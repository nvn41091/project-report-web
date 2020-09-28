import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';

@Directive({
  selector: '[ngxNullValue]',
})
export class NullValueDirective {
  constructor(private el: ElementRef, private control: NgControl) {  }

  @Output() outputUpper: EventEmitter<string> = new EventEmitter();
  value: string;

  @HostListener('blur', ['$event.target.value']) onBlur(value: string) {
    if (value.trim().length === 0) {
      this.control.control.setValue(null);
    }
  }
}

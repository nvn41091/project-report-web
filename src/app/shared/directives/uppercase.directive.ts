import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef,
} from '@angular/core';
import {AbstractControl, NgControl} from '@angular/forms';

@Directive({
  selector: '[ngxUppercase]',
})
export class UppercaseDirective {
  constructor(private el: ElementRef, private control: NgControl) {  }

  @Output() outputUpper: EventEmitter<string> = new EventEmitter();
  value: string;

  @HostListener('input', ['$event']) onInputChange($event) {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();
    this.control.control.setValue(this.el.nativeElement.value.toUpperCase());
  }
}

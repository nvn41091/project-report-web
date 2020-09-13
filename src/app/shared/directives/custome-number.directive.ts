import {AbstractControl, ValidatorFn} from '@angular/forms';

export function customerNumberValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const number = !nameRe.test(control.value);
    if (!control.value) {
      return null;
    }
    return number ? {'onlyNaturalNumber': {value: control.value}} : null;
  };
}
export function numberValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const number = !nameRe.test(control.value);
    if (!control.value) {
      return null;
    }
    return number ? {'onlyNumber': {value: control.value}} : null;
  };
}

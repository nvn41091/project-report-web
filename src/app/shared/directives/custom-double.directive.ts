import {AbstractControl, ValidatorFn} from '@angular/forms';

export function customeDoubleValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const nameRe: RegExp = new RegExp(/^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$/);
    const number = !/^(-?)(0|([1-9][0-9]*))(.[0-9]*)?$/.test(control.value);
    if (!control.value) {
      return null;
    }
    return number ? {'onlyDoubleNumber': {value: control.value}} : null;
  };
}
export function customeDoublePositiveValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    // const nameRe: RegExp = new RegExp(/^(-?)(0|([1-9][0-9]*))(\\.[0-9]+)?$/);
    const number = !/^(0|([1-9][0-9]*))(.[0-9]+)?$/.test(control.value);
    if (!control.value) {
      return null;
    }
    return number ? {'onlyNumber': {value: control.value}} : null;
  };
}

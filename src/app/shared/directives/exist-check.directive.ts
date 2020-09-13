import {AbstractControl, ValidatorFn} from '@angular/forms';

export function existCheck(data: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const number = (data.filter(e => e.areaCode === control.value).length >= 1) ? true : false;
    if (!control.value) {
      return null;
    }
    return number ? {'exit': {value: data.filter(e => e.areaCode === control.value)}} : null;
  };
}

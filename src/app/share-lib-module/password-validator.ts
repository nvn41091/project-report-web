import {FormGroup} from '@angular/forms';

export function passwordsMatchValidator(form: FormGroup) {
  if (form.get('passwordHash') && form.get('rePassword')) {
    if (form.get('rePassword').value && form.get('passwordHash').value === form.get('rePassword').value) {
      form.get('rePassword').setErrors(null);
      return null;
    }
    form.get('rePassword').setErrors({notMatchPassword: true});
  }
  return null;
}

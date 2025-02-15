import {Injectable} from '@angular/core';
import {NbToastrService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {

  constructor(private toastr: NbToastrService,
              private translate: TranslateService) {
  }

  success(message, translate?: boolean) {
    if (translate) {
      message = this.translate.instant(message);
    }
    this.toastr.success(message, this.translate.instant('common.label.notice'), {icon: 'checkmark-outline'});
  }

  error(message, translate?: boolean) {
    if (translate) {
      message = this.translate.instant(message);
    }
    this.toastr.danger(message, this.translate.instant('common.label.error'), {icon: 'alert-triangle-outline'});
  }

  unknownError() {
    this.error('common.label.unknown_error', true);
  }

  updateSuccess() {
    this.success('common.label.update_success', true);
  }

  insertSuccess() {
    this.success('common.label.insert_success', true);
  }

  deleteSuccess() {
    this.success('common.label.delete_success', true);
  }
}

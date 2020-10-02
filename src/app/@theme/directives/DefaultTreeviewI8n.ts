import { Injectable } from '@angular/core';
import { TreeviewSelection, TreeviewI18n } from 'ngx-treeview';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class DefaultTreeviewI18n extends TreeviewI18n {
  constructor(
    protected translate: TranslateService,
  ) {
    super();
  }

  getText(selection: TreeviewSelection): string {
    if (selection.uncheckedItems.length === 0) {
      if (selection.checkedItems.length > 0) {
        return this.translate.instant('common.tree_view.all');
      } else {
        return '';
      }
    }

    switch (selection.checkedItems.length) {
      case 0:
        return this.translate.instant('common.tree_view.select_option');
      case 1:
        return selection.checkedItems[0].text;
      default:
        return selection.checkedItems.length + ' ' + this.translate.instant('common.tree_view.options_selected');
    }
  }

  getAllCheckboxText(): string {
    return this.translate.instant('common.tree_view.all');
  }

  getFilterPlaceholder(): string {
    return this.translate.instant('common.tree_view.filter');
  }

  getFilterNoItemsFoundText(): string {
    return this.translate.instant('common.tree_view.no_item_found');
  }

  getTooltipCollapseExpandText(isCollapse: boolean): string {
    return isCollapse
      ? this.translate.instant('common.tree_view.expand')
      : this.translate.instant('common.tree_view.collapse');
  }
}

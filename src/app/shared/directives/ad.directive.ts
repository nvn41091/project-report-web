import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[ngx-ad]',
})
export class AdDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }
}

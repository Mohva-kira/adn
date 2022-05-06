import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionType } from './permissions';


@Directive({
  selector: '[appIsGranted]'
})
export class IsGrantedDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

    @Input() set appIsGranted(permission: PermissionType) {
      this.isGranted(permission);
    }  private isGranted(permission: PermissionType) {

    }

}

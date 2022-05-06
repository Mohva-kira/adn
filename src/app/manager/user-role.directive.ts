import { Directive, OnInit, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Role } from '../manager/role';
@Directive({ selector: '[appUserRole]'})
export class UserRoleDirective implements OnInit {
    constructor(
        private templateRef: TemplateRef<any>,
        private authService: AuthService,
        private ViewContainer: ViewContainerRef
    ) { }
    userRoles!: Role[];
    @Input()
    set appUserRole(roles: Role[]) {
        if (!roles || !roles.length) {
            throw new Error('Roles value is empty or missed');
        }
        this.userRoles = roles;
    }
    ngOnInit() {
        let hasAccess = false;
        if (this.authService.isAuthorized() && this.userRoles) {
            hasAccess = this.userRoles.some(r => this.authService.hasRole(r));
        }
        if (hasAccess) {
            this.ViewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.ViewContainer.clear();
        }
    }
}

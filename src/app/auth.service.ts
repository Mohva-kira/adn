import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from './manager/user';
import { Role } from './manager/role';

@Injectable()
export class AuthService {


  private user: User |any  = localStorage.getItem('token');

  constructor(private apiService: ApiService){}
    isAuthorized() {
        return !!this.user;
    }
    hasRole(role: Role) {
        return this.isAuthorized() && this.user.role === role;
    }
    login(role: Role) {
      this.user = { role: role };
    }
    logout() {
      this.apiService.deleteToken();
      this.user = null;

    }
}

import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from './manager/user';
import { Role } from './manager/role';

@Injectable()
export class AuthService {


  private users: User |any =  sessionStorage.getItem('user');

  constructor(private apiService: ApiService){

  }
    isAuthorized(): boolean {
         return !!sessionStorage.getItem('user');
        // if (this.users){
        //   return true;
        // }
        // return false;
    }
    hasRole(role: Role) {

        return this.isAuthorized() && this.users[0].role === role;
    }
    login(role: Role) {
      let user= JSON.parse(this.users);
      user = { role: role };
    }
    logout() {
      // this.apiService.deleteToken();
      sessionStorage.removeItem('user');

    }
}

import { Component } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from './manager/role';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';


@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})

export class AppComponent {

loginbtn:boolean;
logoutbtn:boolean;
  title: any;

constructor(private dataService: ApiService, private router: Router, private authService: AuthService) {
dataService.getLoggedInName.subscribe((name: boolean) => this.changeName(name));
if(this.dataService.isLoggedIn())
{
console.log("loggedin");
this.loginbtn=false;
this.logoutbtn=true
}
else{
this.loginbtn=true;
this.logoutbtn=false
}



}

get isAuthorized() {
  return this.authService.isAuthorized();
}
get isAdmin() {
  return this.authService.hasRole(Role.ADMIN);
}
logout() {
  this.dataService.deleteToken();
  this.authService.logout();
  this.router.navigate(['login']);
}


private changeName(name: boolean): void {
this.logoutbtn = name;
this.loginbtn = !name;
}

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../manager/role';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get isAuthorized() {
    return this.authService.isAuthorized();
  }
  get isAdmin() {
    return this.authService.hasRole(Role.ADMIN);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);

  }

}


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../manager/role';
import { AuthService } from '../auth.service';
import { Users } from '../users';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  users!: Users[];
  user!: Users;
  constructor( private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let data = sessionStorage.getItem('user');
    this.users= JSON.parse( data!);
    console.log(this.users);
    const id = this.route.snapshot.paramMap.get('id');


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

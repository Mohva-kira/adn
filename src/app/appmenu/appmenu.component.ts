
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
  user: Users = JSON.parse( sessionStorage.getItem('user')!)[0];
  constructor( private router: Router, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // let data = sessionStorage.getItem('user');
    // this.users= JSON.parse( data!);
    // this.user = this.users[0];
    // console.log(this.user);
    const id = this.route.snapshot.paramMap.get('id');

  }


  get isAuthorized() {
    return this.authService.isAuthorized();
  }



  logout() {
    this.authService.logout();
    this.router.navigate(['login']);

  }

}

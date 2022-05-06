import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../manager/role';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm !: FormGroup;
  Role = Role;
  public loading = false;
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private authService: AuthService ) {

    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  postdata(angForm1: { value: { email: any; password: any; }; })
{
  this.loading = true;
  this.dataService.newlogin(angForm1.value.email, angForm1.value.password)
.pipe(first())
.subscribe(
data => {
  if (data) {

    this.loading = false;
    sessionStorage.setItem('user', JSON.stringify(data));
    setTimeout(() => {
      console.log(this.authService.isAuthorized());
      console.log(sessionStorage.getItem('user'));
    }, 500);


    console.log(data);
    // @ts-ignore
    console.log(data[0].role);

    // @ts-ignore
    if (data[0].role == Role.ADMIN) {
      // alert('admin');
      this.router.navigate(['admin/dashboard']);
    } else { // @ts-ignore
      if (data[0].role == Role.USER) {
            this.router.navigate(['dashboard']);
          } else { // @ts-ignore
        if (data[0].role == Role.MCH) {
                    this.router.navigate(['mch/dashboard']);
                  }
      }
    }
  } else {
    alert('impossible d\'accéder au serveur');
  }
}
,
error => {
// alert("User name or password is incorrect")
});
}
// tslint:disable-next-line:typedef
get email() { return this.angForm.get('email'); }
// tslint:disable-next-line:typedef
get password() { return this.angForm.get('password'); }

login(role: Role) {
  this.authService.hasRole(role);

}

}

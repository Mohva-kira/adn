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


  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router, private authService: AuthService ) {

    this.angForm = this.fb.group({
      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
      });
  }

  ngOnInit(): void {
  }

  postdata(angForm1: { value: { email: any; password: any; }; })
{
this.dataService.userlogin(angForm1.value.email,angForm1.value.password)
.pipe(first())
.subscribe(
data => {
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
this.router.navigate([redirect]);

console.log(data);
this.authService.login(data[0].role);
console.log(data[0].role);
localStorage.setItem('userid', data[0].id);
if (data[0].role === 'admin') {
  this.router.navigate(['admin/dashboard']);
}else if (data[0].role === 'user') {
  this.router.navigate(['/'])
}

},
error => {
alert("User name or password is incorrect")
});
}
get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }

}

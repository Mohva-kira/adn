import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  NgForm,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Role } from '../manager/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  role !: Role;
  selectRole = [ {id:1, nom: 'Super Admin' } , {id: 2, nom: 'Admin'}, {id:3, nom: 'agent'}, {id:4, nom:'Maternité, clinique ou hopital'} ];
  selectedRole = {id: null};
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],
      password: ['', Validators.required],
      name: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  ngOnInit() {}

  postdata(angForm1: any) {
    const user = JSON.parse(sessionStorage.getItem('user')!);
    angForm1.value.status = 1;
    angForm1.value.role = this.selectedRole.id;
    angForm1.value.created_user= 1;
    angForm1.value.created_date = new Date();
    this.dataService
      .userregistration(
        angForm1.value
      )
      .pipe(first())
      .subscribe(
        (data: any) => {
          this.router.navigate(['login']);
          console.log(data);
        },

        (error: any) => { console.log(error);}
      );
  }

  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
  get name() {
    return this.angForm.get('name');
  }
}

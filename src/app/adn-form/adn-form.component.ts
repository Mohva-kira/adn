import { Adn } from './../adn';
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
import { concat } from 'rxjs';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-adn-form',
  templateUrl: './adn-form.component.html',
  styleUrls: ['./adn-form.component.css']
})
export class AdnFormComponent implements OnInit {
  angForm: FormGroup;
  adn !: Adn[];
  isLinear = false;
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    public datepipe: DatePipe
  ) {
    this.angForm = this.fb.group({
      nom: [
        '',
        [Validators.required],
      ],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      localiteNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      pPrenom: ['', Validators.required],
      pNom: ['', Validators.required],
      pProfession: ['', Validators.required],
      pDomicile: ['', Validators.required],
      mPrenom: ['', Validators.required],
      mNom: ['', Validators.required],
      mProfession: ['', Validators.required],
      mDomicile: ['', Validators.required],
      pnOfficier: ['', Validators.required],
      centre: ['', Validators.required],


    });
  }

  ngOnInit(): void {
  }


  postdata(angForm1: any) {

    if(this.angForm.invalid) {
      this.angForm.setErrors({ ...this.angForm.errors, 'yourErrorName': true });
      return;
    }
    angForm1.value.status = "En attente";
    angForm1.value.dateD = new Date();
    angForm1.value.annee = new Date();
    angForm1.value.userid = localStorage.getItem('userid');
    angForm1.value.printed = "non";
    angForm1.value.adnId = this.datepipe.transform(angForm1.value.dateNaissance, 'ddMMyyyy');

    this.dataService.createadn(angForm1.value).subscribe(
      (adn: Adn) => {
          alert("acte de naissance créer");
          console.log("Adn ajouté", adn);
          this.router.navigate(['dashboard']);
        });
  }

}

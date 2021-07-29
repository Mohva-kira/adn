import { Pays } from './../../pays';
import { Select } from './../../../assets/plugins/uplot/uPlot.d';
import { Locality } from './../../locality';
import { Volet } from './../../volet';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/manager/user';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-declaration',
  templateUrl: './declaration.component.html',
  styleUrls: ['./declaration.component.css']
})
export class DeclarationComponent implements OnInit {
  angForm!: FormGroup;
  sexes = ['Masculin', 'Feminin'];
  centres = ['Principal', 'Secondaire']
  locality !: Locality[];
  cercles !: Locality[];
  communes !: Locality[];
  pays !: Pays[];
  selectedLocal: any = {region: null, cercle: null, commune: null};

user !: User[];
  constructor(private fb: FormBuilder, private dataService: ApiService, public datepipe: DatePipe, private router: Router, private toastr: ToastrService) {

    this.angForm = this.fb.group({
      nom: [
        '',
        [Validators.required],
      ],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      heureNaissance: ['', Validators.required],
      sexe: ['', Validators.required],
      pPrenom: ['', Validators.required],
      pNom: ['', Validators.required],
      pAge: ['', Validators.required],
      pProfession: ['', Validators.required],
      pNationalite:['', Validators.required],
      pDomicile: ['', Validators.required],
      mPrenom: ['', Validators.required],
      mNom: ['', Validators.required],
      mAge: ['', Validators.required],
      mProfession: ['', Validators.required],
      mDomicile: ['', Validators.required],
      mNationalite: ['', Validators.required],
      // pnOfficier: ['', Validators.required],
      centre: ['', Validators.required],
      region: ['', Validators.required],
      cercle: ['', ],
      commune: ['', ],
      dNom: ['', Validators.required],
      dPrenom: ['', Validators.required],
      dAge: ['', Validators.required],
      dDomicile: ['', Validators.required],



    });
   }

  ngOnInit(): void {
    let data = sessionStorage.getItem('user');
    this.user = JSON.parse(data!);

    this.getLocality(this.selectedLocal.region);
    this.getPays();
    console.log(this.selectedLocal);
  }
  postdata(angForm1: any) {


    angForm1.value.status = 1;
    angForm1.value.created_date = new Date();
    angForm1.value.annee = new Date();
    angForm1.value.created_by = this.user[0].id;
    angForm1.value.printed = 0;
    angForm1.value.voletId = this.datepipe.transform(angForm1.value.dateNaissance, 'ddMMyyyy');
    angForm1.value.region = this.selectedLocal.region;
    angForm1.value.commune = this.selectedLocal.commune;
    angForm1.value.cercle = this.selectedLocal.cercle;
    angForm1.value.sexe = this.sexes;

    if (this.selectedLocal.commune){
      angForm1.value.localiteNaissance = this.selectedLocal.commune;
    }else {
      angForm1.value.localiteNaissance = this.selectedLocal.cercle;
    }
    angForm1.value.published = 1;
    
    this.dataService.createVolet(angForm1.value).subscribe(
      (volet: Volet) => {

        this.toastr.success('Volet II créer avec succès!', 'Création volet II!');
        this.router.navigate(['mch/dashboard']);
        });
  }

  getLocality(supId: any){
    this.dataService.readLocality(supId).subscribe((locality: Locality[]) => {
    this.locality = locality;
    console.log('locales', this.locality);


    });
  }

cercle(supId: any){
  console.log(this.selectedLocal.region);

  this.dataService.readLocality(supId).subscribe((cercles: Locality[]) => {
    this.cercles = cercles;
    console.log('cercles', this.cercles);


    });
}

commune(supId: any){
  console.log(this.selectedLocal.cercle);

  this.dataService.readLocality(supId).subscribe((communes: Locality[]) => {
    this.communes = communes;
    console.log('communes', this.communes);


    });
}

getPays(){
  this.dataService.getPays().subscribe((pays: Pays[]) => {
    this.pays = pays;
    console.log('communes', this.communes);


    });
}


}


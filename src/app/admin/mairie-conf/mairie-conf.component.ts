import { Mairie } from './../../mairie';
import { Locality } from './../../locality';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mairie-conf',
  templateUrl: './mairie-conf.component.html',
  styleUrls: ['./mairie-conf.component.css']
})
export class MairieConfComponent implements OnInit {
  mairieForm!: FormGroup;
  locality!: Locality[];
  regions!: Locality[];
  cercles!: Locality[];
  arrondissements!: Locality[];
  communes!: any;
  centre!: any;
  selectedLocal: any = {region: null ,  cercle: null, arrondissement: null};
  constructor( private fb: FormBuilder, private apiService: ApiService, private router: Router,) {

    this.mairieForm = this.fb.group({
      region: [
        '',
        [Validators.required],
      ],
      cercle: ['', Validators.required],
      arrondissement: ['', Validators.required],
      commune: ['', Validators.required],
      centre: ['', Validators.required],



    });
  }

  ngOnInit(): void {

   this.getLocality(this.selectedLocal.region);
  }

  getLocality(supId: any){
    this.apiService.readLocality(supId).subscribe((locality: Locality[]) => {
    this.locality = locality;
    console.log('locales', this.locality);


    });
  }

  saveConf(mairieForm1: any){
    mairieForm1.value.create_at = new Date();
    mairieForm1.value.create_by = localStorage.getItem('userid');
    console.log('form mairie', mairieForm1.value)
    this.apiService.saveMairieConf(mairieForm1.value).subscribe(
      (mairie: Mairie) => {
          alert("Mairie configurer");
          console.log("Config mairie", mairie);
          this.router.navigate(['dashboard']);
        });
    }

    selected(){
      console.log(this.selectedLocal);
    }



  }



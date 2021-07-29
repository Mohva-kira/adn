import { Locality } from './../locality';
import { Mairie } from './../mairie';
import { Adn } from './../adn';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { MatTableDataSource } from '@angular/material/table';
import { Volet } from '../volet';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-adn-form',
  templateUrl: './adn-form.component.html',
  styleUrls: ['./adn-form.component.css']
})
export class AdnFormComponent implements OnInit {
  angForm: FormGroup;
  adn !: Adn[];
  volet !: Volet[];
  voletValider!: Volet[];
  isLinear = false;
  sexes = ['Masculin', 'Féminin'];
  mairieConf!: any;
  Locality!: Locality[];
  volet2IsShow = false;
  jugementIsShow =false;
  public loading = false;
  selectedVolet: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  columnsToDisplay = ['id','nom', 'prenom', 'dateNaissance', 'status', 'actions'];
  dataSource :any =  new MatTableDataSource();
  positionFilter = new FormControl();
  nameFilter = new FormControl();
  filteredValues = {
    id: '', nom: '', prenom: '', dateNaissance:'',
    status: ''
  };
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;


  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router,
    public datepipe: DatePipe,
    private toastr: ToastrService
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

    this.getMairie();

  }
  voletDisplay() {
    this.volet2IsShow = !this.volet2IsShow;
    this.jugementIsShow = false;
    this.valider();

  }
  jugementDisplay() {
    this.volet2IsShow = false;
    this.jugementIsShow = !this.jugementIsShow;

  }

  postdata(angForm1: any) {

    if(this.angForm.invalid) {
      this.angForm.setErrors({ ...this.angForm.errors, 'yourErrorName': true });
      return;
    }
    angForm1.value.status = 'Non valide';
    angForm1.value.dateD = new Date();
    angForm1.value.annee = new Date();
    angForm1.value.userid = localStorage.getItem('userid');
    angForm1.value.printed = 'non';
    angForm1.value.adnId = this.datepipe.transform(angForm1.value.dateNaissance, 'ddMMyyyy');
    angForm1.value.localiteNaissance = this.mairieConf;

    this.dataService.createadn(angForm1.value).subscribe(
      (adn: Adn) => {
        this.toastr.success('Acte de naissance créer avec succès!', 'ADN');
          this.router.navigate(['dashboard']);
        });
  }



  getMairie(){
    this.dataService.readLocality(1).subscribe(
      (local: Locality[]) => {

        this.Locality = local;
        });
    this.dataService.readMairieConf().subscribe(
      (conf: Mairie[]) => {

          console.log("Mairie conf", conf);
          if (conf[0].commune){
                      if(conf[0].commune == '1'){
                        this.mairieConf = "Commune I";
                      } else if (conf[0].commune == '2'){
                        this.mairieConf = "Commune II"

                      }
          }else if (conf[0].arrondissement_id){
           this.mairieConf= this.Locality.find(local => local.id == conf[0].arrondissement_id)! ;

           console.log('', this.mairieConf);
          }else if (conf[0].cercle_id){
            this.mairieConf= this.Locality.find(local => local.id == conf[0].cercle_id)! ;

            console.log('', this.mairieConf);

          } else if (conf[0].region_id){
            this.mairieConf=  this.Locality.find(local => local.id == conf[0].region_id)! ;

           console.log('', this.mairieConf);
          }


        });




      }


      valider(){
        this.loading = true;

        this.dataService.getVolet(null, null).subscribe((volet: Volet[]) => {
          this.volet = volet.filter(volet => volet.published == 1);
           console.log('les volet', volet);
           this.voletValider = this.volet.filter(volet => volet.status == 1 );
           console.log('volet valider', this.voletValider);
           this.dataSource = new MatTableDataSource(this.voletValider);
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;
           this.loading = false;

        });
      }

      nonvalider(){


        this.dataService.getVolet(null, null).subscribe((volet: Volet[]) => {
          this.volet = volet.filter(volet => volet.published == 1);
           console.log('les volet', volet);
           this.voletValider = this.volet.filter(volet => volet.status == 1 );
           console.log('volet valider', this.voletValider);
           this.dataSource = new MatTableDataSource(this.voletValider);
           this.dataSource.sort = this.sort;
           this.dataSource.paginator = this.paginator;

        });
      }
      applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filteredValues);
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      }

}

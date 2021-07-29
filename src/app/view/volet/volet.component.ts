import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Adn } from 'src/app/adn';
import { ApiService } from 'src/app/api.service';
import { Volet } from 'src/app/volet';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-volet',
  templateUrl: './volet.component.html',
  styleUrls: ['./volet.component.css']
})
export class VoletComponent implements OnInit {
  adn!: Adn[];
  title!: string;
  volets!: Volet[];
  form!: FormGroup;
  selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  selectedVolet: any = {id: null, nom: null, prenom: null, dateNaissance: null,
                        localiteNaissance: null, sexe: null, pPrenom: null, pNom: null,
                        pProfession: null, pDomicile: null, mNom: null, mPrenom: null,
                        mProfession: null, mDomicile: null, officierId: null,
                        qualite: null, dateEtab: null, status: null,

                        };
  Status: any = ['Non valide',  'Valide'];
  public loading = false;

  user = JSON.parse(sessionStorage.getItem('user')!);
  constructor( private fb: FormBuilder, private dataservice: ApiService, private route: ActivatedRoute, public datepipe: DatePipe, private toastr: ToastrService ) {
    this.form = this.fb.group(
      {
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
    this.getAdnFromVolet();

  }


  getAdnFromVolet(): void{
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.dataservice.getVolet(id, null).subscribe((volet: Volet[]) => {
      this.volets = volet;
      this.selectedVolet = volet[0];
      this.loading = false;

        });
  }
  selectAdn(acte: Adn): void{
     this.selectedAdn = acte;
  }

updateAdn(form: any): void{
    this.loading = true;
    form.value.id = this.selectedAdn.id;
    form.value.nom = this.selectedAdn.nom;
    form.value.prenom = this.selectedAdn.prenom;
    form.value.status = this.selectedAdn.status;
    if (this.selectedAdn && this.selectedAdn.id){
      this.dataservice.updateAdnStatus(form.value).subscribe((acte: Adn) => {
        this.loading = true;
        this.toastr.warning('Acte de naissance mise à jours avec succès', 'ADN');
      });
    }
}

printupdt(form: any): void {
  form.value.id = this.selectedAdn.id;
  form.value.printed = 'oui';
  form.value.userid = localStorage.getItem('userid');
  form.value.printed_date = new Date();
  form.value.prix = 500;

  this.dataservice.printupdate(form.value).subscribe((acte: Adn) => {
    console.log('Adn Mise à jour' , form.value);
    console.log(acte);


    });


}

printCopie(form: any): void{
  form.value.adn_id = this.selectedAdn.id;
  form.value.prix = 100;
  form.value.userid = localStorage.getItem('userid');
  form.value.printed_date = new Date();

  this.dataservice.printcopie(form.value).subscribe((acte: Adn) => {
    console.log('Adn Mise à jour' , form.value);
    console.log(acte);

    });


}
selectVolet(volet: Volet): void{
  this.selectedVolet = volet;
}
createAdnFromVolet(form: any): void{
    form.value.nom = this.selectedVolet.nom;
    form.value.prenom = this.selectedVolet.prenom;
    form.value.dateNaissance = this.selectedVolet.dateNaissance;
    form.value.localiteNaissance = this.selectedVolet.commune;
    form.value.pNom = this.selectedVolet.pNom;
    form.value.pPrenom = this.selectedVolet.pPrenom;
    form.value.pProfession = this.selectedVolet.pProfession;
    form.value.pDomicile = this.selectedVolet.pDomicile;
    form.value.mNom = this.selectedVolet.mNom;
    form.value.mPrenom = this.selectedVolet.mPrenom;
    form.value.mProfession = this.selectedVolet.mProfession;
    form.value.mDomicile = this.selectedVolet.mDomicile;
    form.value.pnOfficier  = this.user[0].id;
    form.value.annee = new Date('YYYY');
    form.value.status = 'Non valide';
    form.value.userid = this.user[0].id;
    form.value.printed = 'non';
    form.value.adnId = this.datepipe.transform(form.value.dateNaissance, 'ddMMyyyy');


    this.dataservice.createadn(form.value ).subscribe((acte: Adn) => {
    this.toastr.success('Acte de naissance créer avec succès!', 'Création à partir du volet');
    });
}

}

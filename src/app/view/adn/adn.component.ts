
import { Observable } from 'rxjs';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, RouterLink } from '@angular/router';
import { formatCurrency, Location } from '@angular/common';
import { Adn } from './../../adn';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Volet } from 'src/app/volet';
import { ToastrService } from 'ngx-toastr';
import {Locality} from '../../locality';

@Component({
  selector: 'app-adn',
  templateUrl: './adn.component.html',
  styleUrls: ['./adn.component.css']
})
export class AdnComponent implements OnInit {
  adn!: Adn[];
  title!: string;
  volet!: Volet[];
  selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  public loading = false;
  adnForm !: FormGroup;
  validation!: FormGroup;
  text !: string;
  checked = false;
  locality !: Locality[];
  localiteNaissance!: any;
  user = JSON.parse(sessionStorage.getItem('user')!);
  constructor( private fb: FormBuilder, private dataservice: ApiService, private route: ActivatedRoute, private location: Location, private toastr: ToastrService ) {
    this.adnForm = this.fb.group({
      nb_copie: ['', Validators.required],
      password: ['', Validators.required]
      });

    this.validation = this.fb.group({
      checked : ['']
    });
   }

  ngOnInit(): void {
    this.getAdn();
    console.log('utilisateur', this.user);



  }
  getAdn(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.dataservice.detailAdn(id).subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.getLocality();
      this.loading = false;
      console.log(this.adn);
      this.selectAdn(this.adn[0]);
      if (this.adn[0].status == 'Valider'){
        this.text = 'valider';
        console.log(this.adn[0].status);
        this.checked = true;
      } else {
        this.text = 'Invalide';
        this.checked = false;
      }
        });
    this.title = 'Acte de naissance: ' + 'Id ' + id ;

  }


  selectAdn(acte: Adn){
     this.selectedAdn = acte;
  }

updateAdn(form: any, event: any): void{

    this.loading = true;
    if (event.checked === true) {
      this.text = 'Valider';
      form.value.id = this.selectedAdn.id;
      form.value.nom = this.selectedAdn.nom;
      form.value.prenom = this.selectedAdn.prenom;
      form.value.status = 'Valider';
      form.value.published = 1
      if (this.selectedAdn && this.selectedAdn.id){
    this.dataservice.updateAdnStatus(form.value).subscribe((acte: Adn) => {
      this.loading = false;
      this.toastr.success('Valider avec succès!', 'Mise à jour ADN!');
    });
  }

  }else {
      this.text = 'Invalide';
      form.value.id = this.selectedAdn.id;
      form.value.nom = this.selectedAdn.nom;
      form.value.prenom = this.selectedAdn.prenom;
      form.value.status = 'Non valide';
      if (this.selectedAdn && this.selectedAdn.id){
      this.dataservice.updateAdnStatus(form.value).subscribe((acte: Adn) => {
        this.loading = false;
        this.toastr.warning('Status Adn invalide enrégistrer!', 'Mise à jour ADN!');

      });
    }
  }
}

  getLocality(){
    this.dataservice.getAllLocality().subscribe((locality: Locality[]) => {
      console.log('yeouuu');
      this.locality = locality;
      console.log('les locaux', this.locality);
      this.localiteNaissance = this.locality.find(local => local.id == +this.adn[0].localiteNaissance)
      console.log('locales', this.localiteNaissance.name);


    });
  }
printupdt(form: any){
    this.loading = true;
    form.value.id = this.selectedAdn.id;
    form.value.printed = 'oui';
    form.value.userid = localStorage.getItem('userid');
    form.value.printed_date = new Date();
    form.value.prix = 500;

    this.dataservice.printupdate(form.value).subscribe((acte: Adn) => {
    this.loading = false;
    this.toastr.warning('Impression lancé', 'Impression');

    });


}

printCopie(form: any){
    this.loading = true;
    form.value.adn_id = this.selectedAdn.id;
    form.value.prix = 100;
    form.value.userid = localStorage.getItem('userid');
    form.value.printed_date = new Date();

    this.dataservice.printcopie(form.value).subscribe((acte: Adn) => {
      this.loading = false;
      this.toastr.warning('Impression lancé', 'Impression');
    });


}


}

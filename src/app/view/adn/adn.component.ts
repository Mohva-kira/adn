
import { Observable } from 'rxjs';
import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, RouterLink } from '@angular/router';
import { formatCurrency, Location } from '@angular/common';
import { Adn } from './../../adn';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adn',
  templateUrl: './adn.component.html',
  styleUrls: ['./adn.component.css']
})
export class AdnComponent implements OnInit {
  adn!: Adn[];
  title!: string;
  selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  Status: any = ['En attente', 'Incomplet', 'Valider'];

  adnForm !: FormGroup;

  constructor( private fb: FormBuilder,private dataservice: ApiService, private route: ActivatedRoute, private location: Location ) {
    this.adnForm = this.fb.group({
      nb_copie: ['', Validators.required],
      password: ['', Validators.required]
      });
   }

  ngOnInit(): void {
    this.getAdn();

  }
  getAdn(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.dataservice.detailAdn(id).subscribe((adn: Adn[])=>{
      this.adn = adn;

      console.log(this.adn);

        });
    this.title = 'Acte de naissance: ' + 'Id ' + id ;
  }
  selectAdn(acte: Adn){
     this.selectedAdn = acte;
  }

updateAdn(form: any){
		form.value.id = this.selectedAdn.id;
		form.value.nom = this.selectedAdn.nom;
		form.value.prenom = this.selectedAdn.prenom;
    form.value.status = this.selectedAdn.status;
		if(this.selectedAdn && this.selectedAdn.id){
			this.dataservice.updateAdnStatus(form.value).subscribe((acte: Adn)=>{
			console.log("Adn updated" , form.value);
      console.log(acte);

			});

	}
}

printupdt(form: any){
  form.value.id = this.selectedAdn.id;
  form.value.printed = "oui";
  form.value.userid = localStorage.getItem('userid');
  form.value.printed_date = new Date();
  form.value.prix = 500;

    this.dataservice.printupdate(form.value).subscribe((acte: Adn)=>{
    console.log("Adn Mise à jour" , form.value);
    console.log(acte);

    });


}

printCopie(form: any){
  form.value.adn_id = this.selectedAdn.id;
  form.value.prix = 100;
  form.value.userid = localStorage.getItem('userid');
  form.value.printed_date = new Date();

    this.dataservice.printcopie(form.value).subscribe((acte: Adn)=>{
    console.log("Adn Mise à jour" , form.value);
    console.log(acte);

    });


}


}

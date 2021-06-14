import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Adn } from 'src/app/adn';
@Component({
  selector: 'app-update-adn',
  templateUrl: './update-adn.component.html',
  styleUrls: ['./update-adn.component.css']
})
export class UpdateAdnComponent implements OnInit {
  adn!: Adn[];
  filtrer!: Adn;
  selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  Status: any = ['En attente', 'Incomplet', 'Valider'];
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dataservice: ApiService) { }

  ngOnInit(): void {
    this.adn = this.data.adn;
    this.filtrer = this.adn.find(adn  => adn.id == this.data.id)!;
    this.selectAdn(this.filtrer)
  }
  updateAdn(form: any){
		form.value.id = this.selectedAdn.id;
		form.value.nom = this.selectedAdn.nom;
		form.value.prenom = this.selectedAdn.prenom;
    form.value.status = this.selectedAdn.status;
    form.value.userid = localStorage.getItem('userid');

		if(this.selectedAdn && this.selectedAdn.id){
      if (form.value.status =="Valider") {
        form.value.published = 1;

      }
			this.dataservice.updateAdnStatus(form.value).subscribe((acte: Adn)=>{
			console.log("Adn updated" , form.value);
      console.log(acte);

			});

	}
}
selectAdn(acte: Adn){
  this.selectedAdn = acte;
}
}

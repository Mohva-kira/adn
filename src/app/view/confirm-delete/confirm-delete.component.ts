import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Adn } from 'src/app/adn';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
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
deleteAdn(form: any){
  this.dataservice.deleteAdn(form.value).subscribe((acte: Adn)=>{
    console.log("Adn deleted, ", acte);
    this.dataservice.readAdn().subscribe((acte: Adn[])=>{
      this.adn = acte;
    })
  });
}
}

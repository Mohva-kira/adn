


import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Adn } from 'src/app/adn';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../adn-validated/adn-validated.component';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-adn-waiting',
  templateUrl: './adn-waiting.component.html',
  styleUrls: ['./adn-waiting.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdnWaitingComponent implements OnInit {
adn !: Adn [];
nbAdnWaiting !: any;
dataSource :any =  new MatTableDataSource();
columnsToDisplay = ['nom', 'prenom', 'dateNaissance', 'status'];
expandedElement!: PeriodicElement | null;
selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
Status: any = ['En attente', 'Incomplet', 'Valider'];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAdnWaiting();
  }

  public getAdnWaiting(){
    this.apiService.adnAttente().subscribe((adn: Adn[]) => {
      this.adn = adn;
       this.nbAdnWaiting = adn.length;
       this.dataSource = adn;
    });
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
			this.apiService.updateAdnStatus(form.value).subscribe((acte: Adn)=>{
			console.log("Adn updated" , form.value);
      console.log(acte);

			});

	}
}
selectAdn(acte: Adn){
  this.selectedAdn = acte;
}
  deleteAdn(form: any){
    this.apiService.deleteAdn(form.value).subscribe((acte: Adn)=>{
      console.log("Adn deleted, ", acte);
      this.apiService.readAdn().subscribe((acte: Adn[])=>{
        this.adn = acte;
      })
    });
  }
}

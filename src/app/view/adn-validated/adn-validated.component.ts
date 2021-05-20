import { ApiService } from './../../api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Adn } from '../../adn';
import { trigger, state, style, transition, animate } from '@angular/animations';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-adn-validated',
  templateUrl: './adn-validated.component.html',
  styleUrls: ['./adn-validated.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AdnValidatedComponent implements OnInit {

  adn!: Adn[];
  nbAdnValide!: any;
  dataSource :any =  new MatTableDataSource();
  columnsToDisplay = ['nom', 'prenom', 'dateNaissance', 'status'];
  expandedElement!: PeriodicElement | null;
  selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  Status: any = ['En attente', 'Incomplet', 'Valider'];

  adnForm !: FormGroup;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
    this.getAllAdnValiddate();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllAdnValiddate() {
    this.apiService.adnValider().subscribe((adn: Adn[]) => {
      this.adn = adn;
       this.nbAdnValide = adn.length;
       this.dataSource = new MatTableDataSource(adn);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

export interface PeriodicElement {
  nom: string;
  prenom: string;
  dateNaissance: Date;
  status: string;
}



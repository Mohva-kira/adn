
import { UpdateAdnComponent } from './../update-adn/update-adn.component';



import { ApiService } from './../../api.service';
import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Adn } from 'src/app/adn';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../adn-validated/adn-validated.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


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
columnsToDisplay = ['nom', 'prenom', 'dateNaissance', 'status', 'actions'];
expandedElement!: PeriodicElement | null;
selectedAdn: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
Status: any = ['En attente', 'Incomplet', 'Valider'];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAdnWaiting();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public getAdnWaiting(){
    this.apiService.adnAttente().subscribe((adn: Adn[]) => {
      this.adn = adn;
       this.nbAdnWaiting = adn.length;
       this.dataSource = new MatTableDataSource(adn);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  openDialog(id: number) {
    this.dialog.open(UpdateAdnComponent, {
      data: {
        adn: this.adn,
        id: id
      }
    });
  }
}


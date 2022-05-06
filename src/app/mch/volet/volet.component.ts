import { User } from './../../manager/user';
import { Volet } from './../../volet';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-volet',
  templateUrl: './volet.component.html',
  styleUrls: ['./volet.component.css']
})
export class VoletComponent implements OnInit {
  title !: String;
  volet !: Volet[];
  voletValider!: Volet[];
  selectedVolet: any = {id: null ,  nom: null, prenom: null, status: null, nb_copie: null};
  Status: any = ['Non valide',  'Valide'];
  dataSource :any =  new MatTableDataSource();
  columnsToDisplay = ['id','nom', 'prenom', 'dateNaissance', 'status', 'actions'];
  user !:User;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

positionFilter = new FormControl();
nameFilter = new FormControl();

filteredValues = {
  id: '', nom: '', prenom: '', dateNaissance:'',
  status: ''
};

  constructor(private apiService: ApiService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit(): void {
    let data = sessionStorage.getItem('user');
    let users= JSON.parse( data!);
    this.user = users[0];
    console.log(this.user.id);
    this.getVolet();



  }

  getVolet(){
    const id = this.route.snapshot.paramMap.get('id');
    if (!id){
      const id = ''
    }

    this.apiService.getVolet(id, this.user.id ).subscribe((volet: Volet[])=>{
      this.volet = volet;

      console.log(this.volet);
      this.dataSource = new MatTableDataSource(this.volet);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.positionFilter.valueChanges.subscribe((positionFilterValue) => {
        this.filteredValues['id'] = positionFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });

      this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
        this.filteredValues['nom'] = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filteredValues);
      });

      this.dataSource.filterPredicate = this.customFilterPredicate();
        });
    this.title = 'Volet' + 'Id ' + id ;

  }
  selectVolet(volet: Volet){
    this.selectedVolet = volet;
 }

 valider(){
  const id = this.route.snapshot.paramMap.get('id');
  this.apiService.getVolet(id, null).subscribe((volet: Volet[]) => {
    this.volet = volet.filter(volet => volet.published == 1);
     console.log('les volet', volet);
     this.voletValider = this.volet.filter(volet => volet.status == 1 );
     console.log('volet valider', this.voletValider);
     this.dataSource = new MatTableDataSource(this.voletValider);
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;

  });
}

nonvalider(){
  const id = this.route.snapshot.paramMap.get('id');

  this.apiService.getVolet(id, this.user.id).subscribe((volet: Volet[]) => {
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

deleteConfirm(id:number){
  this.dialog.open(ConfirmDeleteComponent, {
    data: {
      volet: this.volet,
      id: id
    }
  });
}

customFilterPredicate() {
  const myFilterPredicate = (data: Volet, filter: string): boolean => {


    let searchString = JSON.parse(filter);
    return data.id.toString().trim().indexOf(searchString.position) !== -1 &&
      data.nom.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
  }
  return myFilterPredicate;
}
}

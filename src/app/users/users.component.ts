import { ApiService } from './../api.service';
import { Users } from './../users';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PeriodicElement } from '../view/adn-validated/adn-validated.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  user !: Users[];
  nbUsers !: String;
  dataSource :any =  new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
expandedElement!: PeriodicElement | null;

columnsToDisplay = ['name', 'email', 'created_date'];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.readUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public readUsers(){
    this.apiService.readUsers().subscribe((user: Users[]) => {
      this.user = user;
      this.dataSource = new MatTableDataSource(user);
      console.log(this.user);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

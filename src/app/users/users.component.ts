import { UpdateUserComponent } from './../update-user/update-user.component';
import { UserDeleteComponent } from './../user-delete/user-delete.component';
import { ApiService } from './../api.service';
import { Users } from './../users';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PeriodicElement } from '../view/adn-validated/adn-validated.component';
import { MatDialog } from '@angular/material/dialog';

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


columnsToDisplay = ['name', 'email', 'role', 'created_date', 'actions'];


  constructor(private apiService: ApiService, public dialog: MatDialog) { }

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
  openDialog(id: number) {
    this.dialog.open(UpdateUserComponent, {
      data: {
        adn: this.user,
        id: id
      }
    });
  }
  deleteConfirm(id:number){
    this.dialog.open(UserDeleteComponent, {
      data: {
        adn: this.user,
        id: id
      }
    });
  }

}

import { Volet } from './../../volet';
import { ApiService } from 'src/app/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
volet!: Volet[];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  getVolet(userid: any){

    const user = JSON.parse(sessionStorage.getItem('user')!);
    this.apiService.getVolet(null, null).subscribe((volet: Volet[])=>{
      this.volet = volet;

      console.log(this.volet);

        });
  }

}

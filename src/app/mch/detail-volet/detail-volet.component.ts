import { ActivatedRoute } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { User } from './../../manager/user';
import { Component, OnInit } from '@angular/core';
import { Volet } from 'src/app/volet';

@Component({
  selector: 'app-detail-volet',
  templateUrl: './detail-volet.component.html',
  styleUrls: ['./detail-volet.component.css']
})
export class DetailVoletComponent implements OnInit {
 volet!: Volet[];

 user!: User;
 Status: any = [1, 0]
  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let userdata = sessionStorage.getItem('user');
    let users = JSON.parse(userdata!)
    this.user = users[0];
    this.getVolet();
  }

  getVolet(){
    const id = this.route.snapshot.paramMap.get('id');


    this.apiService.getVolet(id, this.user.id ).subscribe((volet: Volet[])=>{
      this.volet = volet;

      console.log(this.volet);

      });

  }

}

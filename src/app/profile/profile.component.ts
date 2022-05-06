import { ApiService } from './../api.service';
import { Users } from './../users';
import { User } from './../manager/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Adn } from '../adn';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  users!: any[];
  user!: Users;
  adns!: Adn[];
  myAdns!: Adn[];
  nbMyAdns!: number;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    let data = sessionStorage.getItem('user');
    this.users= JSON.parse(data!);

    const id = this.users[0].id;
      this.apiService.readAdn().subscribe((adn: Adn[]) => {
        this.adns = adn;
        this.myAdns = this.adns.filter(adn => adn.created_user == id)!;
        this.nbMyAdns = this.myAdns.length;
        console.log(this.myAdns);
      });



}


public get AdnRanger(): Adn[] {
  return this.myAdns.slice().reverse();
}
}

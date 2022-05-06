import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Adn } from '../adn';
import { cursorTo } from 'readline';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  adn!: Adn[];
  nbAdnAtt!: any;
  nbAdnVal!: any;
  nbAdnTotal!: any;
  nbAdnRej!: any;
  totalRev!: any;
  totalRevCopie!: any;
  totalRevOriCopie!:any;

  constructor(private dataservice: ApiService) {}

  ngOnInit(): void {
    this.getAllAdn();
    this.countPrint();
    this.countPrintCopie();
  }

  getAllAdn() {
    this.dataservice.readAdn().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.nbAdnTotal = adn.length;
      this.nbAdnAtt = this.adn.filter(adn => adn.status == 'Non valide').length;
      this.nbAdnVal = this.adn.filter(adn => adn.status == 'Valider').length;
    });
  }

  countPrint(){
    this.dataservice.countPrint().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.totalRev = this.adn.reduce((acc, cur) => acc + 500 , 0);
    });
  }

  countPrintCopie(){
    this.dataservice.countPrintCopie().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.totalRevCopie = this.adn.reduce((acc, cur) => acc += 100 * cur.nb_copie , 0);
      console.log(this.totalRevCopie);
      console.log(adn);
    });
  }



}

import { ApiService } from './../../api.service';
import { Component, OnInit } from '@angular/core';
import { Adn } from '../../adn';
import { cursorTo } from 'readline';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
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
    this.getAdnWaiting();
    this.getAdnValidate();
    this.getAdnReject();
    this.countPrint();
    this.countPrintCopie();
  }

  getAllAdn() {
    this.dataservice.readAdn().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.nbAdnTotal = adn.length;
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

  getAdnWaiting() {
    this.dataservice.readAdn().subscribe((adn: Adn[]) => {
      this.adn = adn;
      const nonvalid = this.adn.filter(adn => adn.status == 'Non valide' );
      this.nbAdnAtt = nonvalid.length;
    });
  }

  getAdnValidate(){
    this.dataservice.adnValider().subscribe((adn: Adn[]) => {
      this.adn = adn;
      const valide = this.adn.filter(adn => adn.status == 'Valider' );
      this.nbAdnVal = valide.length;
    });
  }

  getAdnReject(){
    this.dataservice.adnIncomplet().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.nbAdnRej = adn.length;
    });
  }
}

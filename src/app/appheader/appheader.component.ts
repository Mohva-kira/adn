import { AuthService } from './../auth.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../manager/role';
import { Adn } from '../adn';


@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  public searchInput: String = '';
  public searchResult!: Adn[];

  adn !: Adn[];
  nbAdnTotal: any;
  nbAdnAtt: any;
  adnAtt!: Adn[];
  loginbtn:boolean;
logoutbtn:boolean;
  title: any;

  constructor(private apiService: ApiService, private auth : AuthService, private router: Router) {

    apiService.getLoggedInName.subscribe((name: boolean) => this.changeName(name));
if(this.apiService.isLoggedIn())
{
console.log("loggedin");
this.loginbtn=false;
this.logoutbtn=true
}
else{
this.loginbtn=true;
this.logoutbtn=false
}
  this.apiService.readAdn()
   }

  ngOnInit(): void {
    this.getAllAdn();
    this.getAdnWaiting();
  }


  get isAuthorized() {
    return this.auth.isAuthorized();
  }
  get isAdmin() {
    return this.auth  .hasRole(Role.ADMIN);
  }
  logout() {
    this.apiService.deleteToken();
    this.auth.logout();
    this.router.navigate(['login']);
  }


  private changeName(name: boolean): void {
  this.logoutbtn = name;
  this.loginbtn = !name;
  }

  getAllAdn() {
    this.apiService.readAdn().subscribe((adn: Adn[]) => {
      this.adn = adn;
      this.nbAdnTotal = adn.length;
    });
  }

  getAdnWaiting() {
    this.apiService.adnAttente().subscribe((adn: Adn[]) => {
      this.adnAtt = adn;
      this.nbAdnAtt = adn.length;
    });
  }

  fetchAdn(event: any): any  {
    if (event.target.value === '') {
      return this.searchResult = [];
    }
    this.searchResult = this.adn.filter((adn) => {
      return adn.adnId.toString().toLowerCase().startsWith(event.target.value.toLowerCase());
    })

    console.log(this.searchResult);
  }



}

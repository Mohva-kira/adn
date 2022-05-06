import { Pays } from './pays';

import { Volet } from './volet';
import { Locality } from './locality';
import { User } from './manager/user';


import { Adn } from './adn';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { Observable } from 'rxjs';
import { Mairie } from './mairie';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  redirectUrl!: string;
  baseUrl = 'http://localhost/adn/php';
  adn!: Adn[];

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {}

  public userlogin(username: any, password: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(
        map((Users) => {
          sessionStorage.setItem('user', JSON.stringify(Users[0]));

          this.setToken(Users[0].name);
          this.getLoggedInName.emit(true);
          return Users;
        })
      );
  }
  public newlogin(username: any, password: any) {
    return this.httpClient
      .post(this.baseUrl + '/login.php', { username, password });
  }

  public userregistration(user: User) {
    return this.httpClient
      .post<User>(this.baseUrl + '/register.php', user)
      .pipe(
        map((Users) => {
          return Users;
        })
      );
  }




  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  deleteToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true;
    }
    return false;
  }

  public createadn(adn: Adn): Observable<Adn> {
    return this.httpClient
      .post<Adn>(this.baseUrl + '/api/create_adn.php', adn)
      .pipe(
        map((Adn) => {
          return Adn;
        })
      );
  }

  public createVolet(volet: Volet): Observable<Volet> {
    return this.httpClient
      .post<Volet>(this.baseUrl + '/api/create_volet.php', volet)
      .pipe(
        map((volet) => {
          return volet;
        })
      );

  }

  public getVolet(id: any, userid: any): Observable<Volet[]> {
    return this.httpClient.get<Volet[]>(
      this.baseUrl + '/api/get_volet.php?id=' + id +'&userid=' + userid
    );
  }

  public getPays(): Observable<Pays[]>{
    return this.httpClient.get<Pays[]>(
      this.baseUrl + '/api/get_pays.php'
    );
  }
  public readAdn(): Observable<Adn[]> {
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/get_all_adn.php'
    );

  }

  public readLocality(supId: any): Observable<any> {
    return this.httpClient
    .get<Locality[]>(
      this.baseUrl + '/api/get_locality.php/?supId=' + supId
    );

  }
  public  getAllLocality(): Observable<any>{
    return  this.httpClient
      .get<Locality[]>(
        this.baseUrl + '/api/get_all_local.php'
      );
  }
  public adnValider(): Observable<Adn[]> {
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/adn_validate.php'
    );

  }
  public adnAttente(): Observable<Adn[]> {
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/adn_waiting.php'
    );

  }

  public adnIncomplet(): Observable<Adn[]> {
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/adn_incomplet.php'
    );

  }

  public detailAdn(id:any): Observable<Adn[]> {
    return this.httpClient.get<Adn[]>(
      this.baseUrl + '/api/get_adn_by_id.php/?id=' + id
    );
  }
  updateAdnStatus(acte: Adn){
		return this.httpClient.put<Adn>(`${this.baseUrl}/api/update_status.php`, acte).pipe(
      map((Adn)=> {
        return Adn;
      })
      ) ;
	}
  deleteAdn(acte: Adn){
		return this.httpClient.put<Adn>(`${this.baseUrl}/api/delete_adn.php`, acte).pipe(
      map((Adn)=> {
        return Adn;
      })
      ) ;
	}

  printupdate(acte: Adn){
		return this.httpClient.put<Adn>(`${this.baseUrl}/api/print_update.php`, acte).pipe(
      map((Adn)=> {
        return Adn;
      })
      ) ;
	}

  printcopie(acte: Adn){
    return this.httpClient.put<Adn>(`${this.baseUrl}/api/print_copie.php`, acte).pipe(
      map((Adn)=> {
        return Adn;
      })
      ) ;

  }

  countPrint(){
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/printed_adn.php'
    );
  }

  countPrintCopie(){
    return this.httpClient
    .get<Adn[]>(
      this.baseUrl + '/api/printed_copie_adn.php'
    );
  }

  public readUsers(): Observable<Users[]> {
    return this.httpClient
    .get<Users[]>(
      this.baseUrl + '/api/users.php'
    );

  }
  public saveMairieConf(mairie: Mairie): Observable<Mairie> {
    return this.httpClient
      .post<Mairie>(this.baseUrl + '/api/configmairie.php', mairie)
      .pipe(
        map((mairie) => {
          return mairie;
        })
      );
  }
  public readMairieConf():  Observable<Mairie[]> {
    return this.httpClient
    .get<Mairie[]>(
      this.baseUrl + '/api/get_mairie_conf.php'
    );

  }

  log(arg0: string): void {
    throw new Error('Method not implemented.');
  }
  handleError<T>(arg0: string): any {
    throw new Error('Method not implemented.');
  }
}

import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Adn } from '../adn';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  adn !: Adn[];
  public searchInput: String = '';
 public searchResult: Array<any> = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  fetchAdn(event: any): any{
    if(event === '') {
      return this.searchResult = []
    }
    this.searchResult = this.adn.filter(function(adn) {
      return adn.adnId;
    })
}

}

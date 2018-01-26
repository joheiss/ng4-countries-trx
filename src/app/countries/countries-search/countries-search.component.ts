import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Router} from '@angular/router';
import {CountriesSearchCriteria} from '../model/countries-search-criteria';

@Component({
  selector: 'jo-countries-search',
  templateUrl: './countries-search.component.html',
  styleUrls: ['./countries-search.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesSearchComponent implements OnInit {

  @Input('searchCriteria') searchCriteria: CountriesSearchCriteria;
  @Output('search') search = new EventEmitter<CountriesSearchCriteria>();

  search$ = new Subject<CountriesSearchCriteria>();

  constructor(private router: Router) {
    this.search$
      .debounceTime(300)
      // .distinctUntilChanged()
      .subscribe(() => this.search.emit(this.searchCriteria));
  }


  ngOnInit(): void {
  }

  onInput(term) {
    this.searchCriteria.term = term.toLocaleLowerCase();
    this.search$.next(this.searchCriteria);
  }

}

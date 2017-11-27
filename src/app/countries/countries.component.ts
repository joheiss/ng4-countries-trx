import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Country, SearchCriteria, SortCriteria} from './country';
import {CountriesService} from './countries.service';
import {Observable} from 'rxjs/Observable';
import {slideRightLeft} from '../shared/animations';

@Component({
  selector: 'jo-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slideRightLeft
  ]
})
export class CountriesComponent implements OnInit {

  countries$: Observable<Country[]>;
  count$: Observable<number>;
  selectedCountry: Country;
  searchCriteria: SearchCriteria;
  sortCriteria: SortCriteria;
  continentSelections: any;
  orderByOptions: any;
  isFilterPopupVisible: boolean;
  isSortPopupVisible: boolean;

  constructor(private service: CountriesService) { }

  ngOnInit(): void {
    this.countries$ = this.service.filteredCountries$;
    this.count$ = this.service.filteredCountriesCount$;
    this.selectedCountry = this.service.currentCountry;
    this.searchCriteria = this.service.searchCriteria;
    this.continentSelections = this.service.continentSelections;
    this.sortCriteria = this.service.sortCriteria;
    this.orderByOptions = this.service.orderByOptions;
    this.isFilterPopupVisible = false;
    this.isSortPopupVisible = false;
  }

  onSearch(criteria): void {
    this.service.searchCountries(criteria);
  }

  onSelected(country: Country): void {
    this.service.selectCountry(country);
  }

  onFilterClosed(): void {
    this.isFilterPopupVisible = false;
    this.service.searchCountries(this.searchCriteria);
  }

  onFilterSelected(): void {
    this.isFilterPopupVisible = true;
  }

  onSortSelected(): void {
    this.isSortPopupVisible = true;
  }

  onSortClosed(): void {
    this.isSortPopupVisible = false;
    this.service.setSearchAndSortCriteria(this.searchCriteria, this.sortCriteria);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {find} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Country} from './model/country';
import {CountriesSearchCriteria} from './model/countries-search-criteria';
import {CountriesSortCriteria} from './model/countries-sort-criteria';
import {CountriesSearch} from './model/countries-search';
import {CountriesSort} from './model/countries-sort';
import {OrderByOption} from './model/orderby-option';
import {ContinentOption} from './model/continent-option';
import {CountriesSortDirection} from './model/countries-sort-direction';

@Injectable()
export class CountriesService {

  filteredCountries$ = new ReplaySubject<Country[]>(1);
  filteredCountriesCount$ = new ReplaySubject<number>(1);

  private _countries: Country[] = [];
  private _currentCountry: Country;

  private _search: CountriesSearch;
  private _sort: CountriesSort;

  constructor(private http: HttpClient,
              private translate: TranslateService) {

    this._search = new CountriesSearch(translate);
    this._sort = new CountriesSort();
  }

  get continentOptions(): ContinentOption[] {
    // console.log(`OrderByOptions: ${this._search.continentOptions}`);
    return this._search.continentOptions;
  }

  get countries(): Country[] {
    return this._countries;
  }

  get currentCountry(): Country {
    return this._currentCountry;
  }

  get orderByOptions(): OrderByOption[] {
    // console.log(`OrderByOptions: ${this._sort.orderByOptions}`);
    return this._sort.orderByOptions;
  }

  get searchCriteria(): CountriesSearchCriteria {
    return this._search.searchCriteria;
  }

  get sortCriteria(): CountriesSortCriteria {
    return this._sort.sortCriteria;
  }

  get sortDirections(): CountriesSortDirection[] {
    return this._sort.sortDirections;
  }

  cleanup(): void {
    this.filteredCountries$.unsubscribe();
    this.filteredCountriesCount$.unsubscribe();
  }

  load(): Promise<any> {

    this.translate.setDefaultLang('en');
    this.translate.use(window.navigator.language.substring(0, 2));
    // console.log('CURRENT LANGUAGE: ', this.translate.currentLang);

    this._countries = null;

    return this.loadCountries()
    // return this.readCountries()
      .toPromise()
      .then(data => {
          const language = this.translate.currentLang;
          data.map(country => {
            if (language !== 'en') {
              // exchange country name from translations with english country name
              let nameStore: string;
              // save english country name
              nameStore = country.name;
              // get country name in current language
              country.name = country.translations[language] || nameStore;
              country.translations['en'] = nameStore;
            }
            // prepare search field
            country['searchField'] = this._search.buildSearchField(country);
            return country;
          });
          const sorted = this._sort.sort(data);
          this._countries = sorted;
          this.loadSubjects(sorted);
        }
      )
      .catch(err => Promise.resolve());
  }

  getCountryByCode(code: string): Country {

    const country = this.findCountry(code);
    if (country.borders) {
      country.borders = country.borders.map(border => {
        if (border['code']) {
          return border; // has been mapped already before
        }
        const mappedBorder: any = {};
        mappedBorder.name = `${this.findCountry(border).name} (${border})`;
        mappedBorder.code = border;
        return mappedBorder;
      });
    }
    return country;
  }

  searchCountries(criteria?: CountriesSearchCriteria) {

    const result = this._search.search(this._countries, criteria);
    this.filteredCountriesCount$.next(result.count);
    this.filteredCountries$.next(this._sort.sort(result.countries));
    this._search.searchCriteria = criteria;
  }

  selectCountry(country: Country) {
    this._currentCountry = country;
  }

  setSearchAndSortCriteria(searchCriteria: CountriesSearchCriteria, sortCriteria: CountriesSortCriteria) {
    this._sort.sortCriteria = sortCriteria;
    this.searchCountries(searchCriteria);
  }

  private findCountry(code): Country {

    return find(this._countries, country => country.alpha3Code === code);
  }

  private loadCountries(): Observable<Country[]> {

    return this.http.get<Country[]>('https://restcountries.eu/rest/v2/all')
      .retry(3)
      .map(response => response.map(item => {
        item.region = item.region || 'None';
        return item;
      }));
  }

  private loadSubjects(data: any) {
    this.filteredCountries$.next(data);
    this.filteredCountriesCount$.next(data.length);
    this._currentCountry = (data[0]);
  }

}


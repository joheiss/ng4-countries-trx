import {Injectable} from '@angular/core';
import {Country, SearchCriteria, SortCriteria} from './country';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import {cloneDeep, find, isEqual, orderBy} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CountriesService {

  filteredCountries$ = new ReplaySubject<Country[]>(1);
  filteredCountriesCount$ = new ReplaySubject<number>(1);

  private _countries: Country[] = [];
  private _currentCountry: Country;

  private _emptyCriteria;
  private _searchCriteria;
  private _sortCriteria;

  private _continentSelections = [
    { name: 'africa', description: 'Africa' },
    { name: 'america', description: 'Americas' },
    { name: 'asia', description: 'Asia' },
    { name: 'australia', description: 'Australia' },
    { name: 'europe', description: 'Europe' },
    { name: 'antarctica', description: 'Antarctica' },
    { name: 'none', description: 'None' }
  ];

  private _orderByOptions = [
    { name: 'name', description: 'Country Name' },
    { name: 'alpha3Code', description: 'ISO Code' },
    { name: 'region', description: 'Region' },
    { name: 'subregion', description: 'Sub Region' },
    { name: 'population', description: 'Population' },
    { name: 'area', description: 'Area Size' },
    { name: 'gini', description: 'Gini Index' },
    { name: 'numericCode', description: 'Numeric Code' },
  ];

  constructor(private http: HttpClient,
              private translate: TranslateService) {

    this._emptyCriteria = new SearchCriteria();
    this._searchCriteria = new SearchCriteria();
    this._sortCriteria = new SortCriteria();
  }

  get continentSelections() {
    return this._continentSelections;
  }

  get countries(): Country[] {
    return this._countries;
  }

  get currentCountry(): Country {
    return this._currentCountry;
  }

  get orderByOptions() {
    return this._orderByOptions;
  }

  get searchCriteria(): SearchCriteria {
    return this._searchCriteria;
  }

  get sortCriteria(): SortCriteria {
    return this._sortCriteria;
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
            country['searchField'] = this.prepareSearchField(country);
            return country;
          });
          const sorted = this.sortCountries(data);
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

  searchCountries(criteria: SearchCriteria) {

    this._searchCriteria = criteria;
    const results = this.findCountries();
    if (results) {
      const count = results.length || 0;
      this.filteredCountriesCount$.next(count);
    } else {
      this.filteredCountriesCount$.next(0);
    }
    this.filteredCountries$.next(this.sortCountries(results));
  }

  selectCountry(country: Country) {
    this._currentCountry = country;
  }

  setSearchAndSortCriteria(searchCriteria: SearchCriteria, sortCriteria: SortCriteria) {
    this._sortCriteria = sortCriteria;
    this.searchCountries(searchCriteria);
  }

  private fillContinentsForSearch(): string[] {
    const continents = [];
    if (this._searchCriteria.africa) {
      continents.push('africa');
    }
    if (this._searchCriteria.america) {
      continents.push('americas');
    }
    if (this._searchCriteria.asia) {
      continents.push('asia');
    }
    if (this._searchCriteria.australia) {
      continents.push('oceania');
    }
    if (this._searchCriteria.antarctica) {
      continents.push('polar');
    }
    if (this._searchCriteria.europe) {
      continents.push('europe');
    }
    if (this._searchCriteria.none) {
      continents.push('none');
    }
    return continents;
  }

  private findCountries() {

    if (isEqual(this._searchCriteria, this._emptyCriteria)) {
      return this._countries;
    }

    const continents = this.fillContinentsForSearch();

    let results = this._countries;
    if (continents.length > 0) {
      results = results.filter(country => continents.includes(country.region.toLocaleLowerCase()));
    } else {
      results = [];
    }

    if (this._searchCriteria.term !== '') {
      results = results.filter(country => country['searchField'].includes(this._searchCriteria.term));
    }
    return results;
  }

  private findCountry(code): Country {

    return find(this._countries, country => country.alpha3Code === code);
  }

  private readCountries(): Observable<Country[]> {

    return this.http.get<Country[]>('./assets/data/countries.json')
      .map(response => response.map(item => {
        item.region = item.region || 'None';
        return item;
      }));
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

  private prepareSearchField(country: Country): string {

    const language = this.translate.currentLang;
    if (language === 'en') {
      return (country.alpha3Code + ' ' + country.name + ' ' + country.nativeName).toLocaleLowerCase();
    }

    // prepare search field
    let searchField = (country.name + ' ' + country.nativeName).toLocaleLowerCase();

    const special = this.replaceSpecialCharacters(searchField);

    if (searchField.localeCompare(special)) {
      searchField = searchField + ' ' + special;
    }
    return country.alpha3Code.toLocaleLowerCase() + ' ' + searchField;
  }

  private prepareSortField(field: any): any {

    let value = field;

    if (typeof field === 'string') {
      value = this.replaceSpecialCharacters(value);
    }

    return value;
  }

  private replaceSpecialCharacters(value: string): string {
    value = value.toLocaleLowerCase();
    value = value.replace(/\u00e4/g, 'ae');
    value = value.replace(/\u00f6/g, 'oe');
    value = value.replace(/\u00fc/g, 'ue');
    value = value.replace(/\u00df/g, 'ss');
    value = value.replace(/\u00e5/g, 'a');
    return value;
  }

  private sortCountries(data: Country[]): Country[] {
    return orderBy(data, [ item => this.prepareSortField(item[this._sortCriteria.fieldName])], [this._sortCriteria.direction]);
  }

}


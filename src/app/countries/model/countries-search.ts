import {CountriesSearchCriteria} from './countries-search-criteria';
import {ContinentOption} from './continent-option';
import {Country} from './country';
import {CountriesSearchResult} from './countries-search-result';
import {isEqual} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {Utilities} from './utilities';

export class CountriesSearch {

  private _result = new CountriesSearchResult();
  private _emptySearchCriteria = new CountriesSearchCriteria();
  private _searchCriteria = new CountriesSearchCriteria();
  private _continentOptions = [
    new ContinentOption('africa', 'Africa'),
    new ContinentOption('america', 'Americas'),
    new ContinentOption('asia', 'Asia'),
    new ContinentOption('australia', 'Australia'),
    new ContinentOption('europe', 'Europe'),
    new ContinentOption('antarctica', 'Antarctica'),
    new ContinentOption('none', 'None')
  ];

  constructor(private translate: TranslateService) { }

  get continentOptions(): ContinentOption[] {
    return this._continentOptions;
  }

  get searchCriteria(): CountriesSearchCriteria {
    return this._searchCriteria;
  }

  set searchCriteria(criteria: CountriesSearchCriteria) {
    this._searchCriteria = criteria;
  }

  public search(allCountries: Country[], criteria?: CountriesSearchCriteria): CountriesSearchResult {
    // update search criteria
    if (criteria) {
      this._searchCriteria = criteria;
    }

    // find countries
    this._result.countries = this._find(allCountries);
    if (this._result.countries) {
      this._result.count = this._result.countries.length;
    } else {
      this._result.count = 0;
    }

    return this._result;
  }

  public buildSearchField(country: Country): string {
    // just concatenate the fields for english
    const language = this.translate.currentLang;
    if (language === 'en') {
      return (country.alpha3Code + ' ' + country.name + ' ' + country.nativeName).toLocaleLowerCase();
    }
    // for all other languages bring the translations over to the search field
    let searchField = (country.name + ' ' + country.nativeName).toLocaleLowerCase();

    const special = Utilities.replaceSpecialCharacters(searchField);

    if (searchField.localeCompare(special)) {
      searchField = searchField + ' ' + special;
    }
    return country.alpha3Code.toLocaleLowerCase() + ' ' + searchField;
  }

  private _find(allCountries: Country[]): Country[] {
    // no search needed if no criteria has been provided
    if (isEqual(this._searchCriteria, this._emptySearchCriteria)) {
      return allCountries;
    }
    // filter by continent
    const continents = this._searchCriteria.getListOfContinentsToSearchFor();
    let results = allCountries;
    if (continents.length > 0) {
      results = results.filter(country => continents.includes(country.region.toLocaleLowerCase()));
    } else {
      results = [];
    }
    // filter by search term
    if (this._searchCriteria.term !== '') {
      results = results.filter(country => country['searchField'].includes(this._searchCriteria.term));
    }
    return results;
  }
}

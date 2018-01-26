import {OrderByOption} from './orderby-option';
import {CountriesSortCriteria} from './countries-sort-criteria';
import {Country} from './country';
import {orderBy} from 'lodash';
import {Utilities} from './utilities';
import {CountriesSortDirection} from './countries-sort-direction';

export class CountriesSort {

  private _sortCriteria = new CountriesSortCriteria();

  private _orderByOptions = [
    new OrderByOption('name', 'Country Name', false),
    new OrderByOption('alpha3Code', 'ISO Code', false),
    new OrderByOption('region', 'Region', false),
    new OrderByOption('subregion', 'Sub Region', false),
    new OrderByOption('population', 'Population', true),
    new OrderByOption('area', 'Area Size', true),
    new OrderByOption('gini', 'Gini Index', true),
    new OrderByOption('numericCode', 'Numeric Code', false)
  ];

  private _sortDirections = [
    new CountriesSortDirection('asc', 'Ascending'),
    new CountriesSortDirection('desc', 'Descending')
  ];

  get orderByOptions(): OrderByOption[] {
    return this._orderByOptions;
  }

  get sortCriteria(): CountriesSortCriteria {
    return this._sortCriteria;
  }

  get sortDirections(): CountriesSortDirection[] {
    return this._sortDirections;
  }

  set sortCriteria(criteria: CountriesSortCriteria) {
    this._sortCriteria = criteria;
  }

  public sort(countries: Country[], criteria?: CountriesSortCriteria): Country[] {
    if (criteria) {
      this._sortCriteria = criteria;
    }
    return orderBy(countries, [ item => this._buildSortField(item[this._sortCriteria.fieldName])], [this._sortCriteria.direction]);
  }

  private _buildSortField(field: any): any {
    let value = field;

    if (typeof field === 'string') {
      value = Utilities.replaceSpecialCharacters(value);
    }
    return value;
  }

}

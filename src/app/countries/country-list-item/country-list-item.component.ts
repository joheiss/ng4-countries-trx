import {Component, Input} from '@angular/core';
import {CountriesService} from '../countries.service';
import {find} from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {Country} from '../model/country';
import {CountriesSortCriteria} from '../model/countries-sort-criteria';

@Component({
  selector: 'jo-country-list-item',
  templateUrl: './country-list-item.component.html',
  styleUrls: ['./country-list-item.component.css']
})
export class CountryListItemComponent {

  @Input('country') country: Country;
  @Input('orderBy') orderBy: CountriesSortCriteria;
  @Input('ranking') ranking: number;

  constructor(private service: CountriesService,
              private translate: TranslateService) {}

  getOrderByDescription(name: string): string {
    const found = find(this.service.orderByOptions, option => option.name === name);
    if (found) {
      return found.displayName;
    }
    return '';
  }

  getOrderByRankingVisibility(name: string): boolean {
    const found = find(this.service.orderByOptions, option => option.name === name);
    if (found) {
      return found.isRankDisplayed;
    }
    return false;
  }

  getSortValue(name: string): string {
    if (typeof this.country[name] === 'number') {
      return this.country[name].toLocaleString(this.translate.currentLang);
    }
    return this.country[name];
  }
}

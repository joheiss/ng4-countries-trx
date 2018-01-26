import {Country} from './country';

export class CountriesSearchResult {

  constructor(public count?: number,
              public countries?: Country[]) {

    this.count = 0;
    this.countries = [] as Country[];
  }
}

import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Country} from '../model/country';
import {ActivatedRoute, Router} from '@angular/router';
import { Location} from '@angular/common';
import {CountriesService} from '../countries.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import {slideLeftRight} from '../../shared/animations';

@Component({
  selector: 'jo-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    slideLeftRight
  ]
})
export class CountryDetailsComponent implements OnInit {

  language;
  country: Country;
  translations: { language: string, name: string }[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private service: CountriesService) {
  }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe(params => {
        this.country = this.service.getCountryByCode(params.get('id'));
        // console.log('COUNTRY: ', this.country);
        this.translations = this.mapTranslationsToArray(this.country.translations);
      });
    this.language = window.navigator.language.substring(0, 2);
  }

  onBack() {
    this.location.back();
  }

  onNavigateToCountry(code) {

    this.router.navigate(['countries', code]);
  }

  private mapTranslationsToArray(translations: { [key: string]: string }) {
    const array: any[] = [];
    for (let key in translations) {
      if (translations.hasOwnProperty(key)) {
        array.push({language: key, name: translations[key]});
      }
    }
    return array;
  }
}

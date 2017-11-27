import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Country, SortCriteria} from '../country';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'jo-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountryListComponent {

    @Input('countries') countries$: Observable<Country[]>;
    @Input('count') count$: Observable<number>;
    @Input('orderBy') orderBy: SortCriteria;
    @Output('selected') selected = new EventEmitter<Country>();

    constructor(private router: Router) {}

  onSelect(country: Country): void {
        this.router.navigate(['countries', country.alpha3Code]);
    }

}

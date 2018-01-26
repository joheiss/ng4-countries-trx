import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CountriesSortCriteria} from '../model/countries-sort-criteria';

@Component({
  selector: 'jo-countries-sort',
  templateUrl: './countries-sort.component.html',
  styleUrls: ['./countries-sort.component.css']
})
export class CountriesSortComponent {

  @Input('orderBy') orderBy: CountriesSortCriteria;
  @Output('sort') sort = new EventEmitter<string>();

  constructor() { }

  onClick() {
    this.sort.emit('sort');
  }

}

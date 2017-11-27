import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {SortCriteria} from '../country';

@Component({
  selector: 'jo-countries-filter',
  templateUrl: './countries-filter.component.html',
  styleUrls: ['./countries-filter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesFilterComponent {

  @Input('orderBy') orderBy: SortCriteria;
  @Output('filter') filter = new EventEmitter<string>();

  constructor() { }

  onClick() {
    this.filter.emit('filter');
  }
}

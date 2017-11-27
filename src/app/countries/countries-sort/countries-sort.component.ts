import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SortCriteria} from '../country';

@Component({
  selector: 'jo-countries-sort',
  templateUrl: './countries-sort.component.html',
  styleUrls: ['./countries-sort.component.css']
})
export class CountriesSortComponent {

  @Input('orderBy') orderBy: SortCriteria;
  @Output('sort') sort = new EventEmitter<string>();

  constructor() { }

  onClick() {
    this.sort.emit('sort');
  }

}

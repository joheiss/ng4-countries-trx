import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {explode} from '../../shared/animations';
import {CountriesSortCriteria} from '../model/countries-sort-criteria';
import {OrderByOption} from '../model/orderby-option';
import {CountriesService} from '../countries.service';
import {CountriesSortDirection} from '../model/countries-sort-direction';

@Component({
  selector: 'jo-countries-sort-popup',
  templateUrl: './countries-sort-popup.component.html',
  styleUrls: ['./countries-sort-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    explode
  ]
})
export class CountriesSortPopupComponent implements OnChanges {

  @Input('sort') sort: CountriesSortCriteria;
  @Input('options') options: OrderByOption[];
  @Input('directions') directions: CountriesSortDirection[];
  @Output('closed') closed = new EventEmitter<any>();

  direction: string;
  field: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.direction = this.sort.direction;
    this.field = this.sort.fieldName;
  }

  onClose() {
    this.closed.emit();
  }

  onChanged(event) {
    if (event.target.name === 'direction') {
      this.sort.direction = event.target.id;
    } else {
      this.sort.fieldName = event.target.id;
    }
    // console.log('SORT CRITERIA: ', this.sort);
  }

}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {SortCriteria} from '../country';
import {explode} from '../../shared/animations';

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

  @Input('sort') sort: SortCriteria;
  @Input('options') options: any[];
  @Output('closed') closed = new EventEmitter<any>();

  directions = [
    { name: 'asc',  description: 'Ascending' },
    { name: 'desc', description: 'Descending' }
  ];

  direction: string;
  field: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.direction = this.sort.direction;
    this.field = this.sort.fieldName;
    console.log('SORT CRITERIA: ', this.sort);
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
    console.log('SORT CRITERIA: ', this.sort);
  }

}

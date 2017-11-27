import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {SearchCriteria} from '../country';
import {explode} from '../../shared/animations';

@Component({
  selector: 'jo-countries-filter-popup',
  templateUrl: './countries-filter-popup.component.html',
  styleUrls: ['./countries-filter-popup.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    explode
  ]
})
export class CountriesFilterPopupComponent {

  @Input('filter') filter: SearchCriteria;
  @Input('continents') continents: any;
  @Output('closed') closed = new EventEmitter<any>();

  constructor() { }

  onClose() {
    this.closed.emit();
  }

  onChanged(event) {
    this.filter[event.target.id] = event.target.checked;
  }

}

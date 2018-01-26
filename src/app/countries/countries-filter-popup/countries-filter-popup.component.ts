import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {explode} from '../../shared/animations';
import {CountriesSearchCriteria} from '../model/countries-search-criteria';
import {ContinentOption} from '../model/continent-option';

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

  @Input('filter') filter: CountriesSearchCriteria;
  @Input('continents') continents: ContinentOption[];
  @Output('closed') closed = new EventEmitter<any>();

  constructor() { }

  onClose() {
    this.closed.emit();
  }

  onChanged(event) {
    this.filter[event.target.id] = event.target.checked;
  }

}

import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'jo-countries-filter-checkbox',
  templateUrl: './countries-filter-checkbox.component.html',
  styleUrls: ['./countries-filter-checkbox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesFilterCheckboxComponent {

  @Input('name') name: string;
  @Input('displayName') displayName: string;
  @Input('checked') checked: boolean;
  @Output('changed') changed = new EventEmitter();

  constructor() { }

  onChange(event) {
    this.changed.emit(event);
  }
}

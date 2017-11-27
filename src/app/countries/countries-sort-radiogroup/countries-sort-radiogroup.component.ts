import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'jo-countries-sort-radiogroup',
  templateUrl: './countries-sort-radiogroup.component.html',
  styleUrls: ['./countries-sort-radiogroup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesSortRadiogroupComponent {

  @Input('name') name: string;
  @Input('buttons') buttons: any[];
  @Input('value') value: boolean;
  @Output('changed') changed = new EventEmitter();

  constructor() { }

  onChanged(event) {
    console.log('Radio group changed: ', event);
    this.changed.emit(event);
  }

}

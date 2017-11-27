import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'jo-countries-sort-radiobutton',
  templateUrl: './countries-sort-radiobutton.component.html',
  styleUrls: ['./countries-sort-radiobutton.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CountriesSortRadiobuttonComponent implements OnChanges {

  @Input('id') id: string;
  @Input('label') label: string;
  @Input('name') name: string;
  @Input('value') value: string;
  @Output('changed') changed = new EventEmitter();

  checked = false;

  constructor() {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.checked = this.id === this.value;
    console.log('RADIOBUTTON ', this.id, ' IS CHECKED: ', this.checked);
  }

  onChange(event) {
    this.changed.emit(event);
  }
}

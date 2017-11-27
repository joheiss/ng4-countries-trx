import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'jo-countries-count',
  templateUrl: './countries-count.component.html',
  styleUrls: ['./countries-count.component.css']
})
export class CountriesCountComponent {

  @Input('count') count$: Observable<number>;

  constructor() { }
}

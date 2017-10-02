import {Component, Input} from '@angular/core';
import {fade, slideUpDown} from '../shared/animations';

@Component({
  selector: 'jo-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.css'],
  animations: [
    fade,
    slideUpDown
  ]
})
export class ZippyComponent {

  @Input('title') title: string;

  isExpanded = false;

  onToggle() {
    this.isExpanded = !this.isExpanded;
  }
}

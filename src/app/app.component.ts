import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {CountriesService} from './countries/countries.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'jo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private translate: TranslateService,
              private router: Router,
              private service: CountriesService) {
  }

  ngOnInit(): void {

    if (!this.service.countries) {
      this.router.navigate(['error'], {replaceUrl: true});
    }
  }

  ngOnDestroy(): void {
    this.service.cleanup();
  }
}

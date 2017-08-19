import {Component, OnDestroy, OnInit} from '@angular/core';
import {CountriesService} from './countries/countries.service';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'jo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private translate: TranslateService,
              private router: Router,
              private service: CountriesService) {

    // translate.setDefaultLang('en');
    // translate.use('de');
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

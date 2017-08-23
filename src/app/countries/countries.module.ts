import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CountriesComponent} from './countries.component';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryListItemComponent} from './country-list-item/country-list-item.component';
import {CountryDetailsComponent} from './country-details/country-details.component';
import {CountriesSearchComponent} from './countries-search/countries-search.component';
import {ZippyModule} from '../zippy/zippy.module';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ZippyModule
  ],
  declarations: [
    CountriesComponent,
    CountryListComponent,
    CountryListItemComponent,
    CountryDetailsComponent,
    CountriesSearchComponent
  ],
  providers: [
  ],
  exports: [
    CountriesComponent
  ]
})
export class CountriesModule {
}


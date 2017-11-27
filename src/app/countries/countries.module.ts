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
import {FormsModule} from '@angular/forms';
import { CountriesCountComponent } from './countries-count/countries-count.component';
import { CountriesFilterComponent } from './countries-filter/countries-filter.component';
import { CountriesSortComponent } from './countries-sort/countries-sort.component';
import { CountriesFilterPopupComponent } from './countries-filter-popup/countries-filter-popup.component';
import { CountriesSortPopupComponent } from './countries-sort-popup/countries-sort-popup.component';
import { CountriesFilterCheckboxComponent } from './countries-filter-checkbox/countries-filter-checkbox.component';
import { CountriesSortRadiobuttonComponent } from './countries-sort-radiobutton/countries-sort-radiobutton.component';
import { CountriesSortRadiogroupComponent } from './countries-sort-radiogroup/countries-sort-radiogroup.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
    CountriesSearchComponent,
    CountriesCountComponent,
    CountriesFilterComponent,
    CountriesSortComponent,
    CountriesFilterPopupComponent,
    CountriesSortPopupComponent,
    CountriesFilterCheckboxComponent,
    CountriesSortRadiobuttonComponent,
    CountriesSortRadiogroupComponent
  ],
  providers: [
  ],
  exports: [
    CountriesComponent
  ]
})
export class CountriesModule {
}


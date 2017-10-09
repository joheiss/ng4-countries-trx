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
import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatChipsModule, MatInputModule, MatRadioModule, MatIconModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {SettingsComponent} from '../settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
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
    SettingsComponent
  ],
  providers: [
  ],
  exports: [
    CountriesComponent
  ]
})
export class CountriesModule {
}


import {Routes} from '@angular/router';
import {CountriesComponent} from './countries/countries.component';
import {CountryDetailsComponent} from './countries/country-details/country-details.component';
import {ErrorComponent} from './error/error.component';
import {SettingsComponent} from './settings/settings.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: CountriesComponent,
    // redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'countries/:id',
    component: CountryDetailsComponent
  },
  {
    path: 'countries',
    component: CountriesComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    redirectTo: 'countries',
    pathMatch: 'full'
  }
];

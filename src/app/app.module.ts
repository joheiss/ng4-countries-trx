import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import {CountriesModule} from './countries/countries.module';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import {CountriesService} from './countries/countries.service';
import {ErrorComponent} from './error/error.component';
import {SharedModule} from './shared/shared.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';

export function startupServiceFactory(startupService: CountriesService): Function {
  return () => startupService.load();
}

export function translateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function localeIdFactory() {

  const defaultLocales = [
    {language: 'de', locale: 'de-DE'},
    {language: 'en', locale: 'en-US'}
    // {language: 'fr', locale: 'fr-FR'}
  ];

  if (window.navigator.language && window.navigator.language.length > 3) {
    return window.navigator.language;
  }

  return (defaultLocales.find(loc => loc.language === window.navigator.language) || defaultLocales[1]).locale;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateLoaderFactory),
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    CountriesModule
  ],
  providers: [
    CountriesService,
    {
      provide: LOCALE_ID,
      useFactory: localeIdFactory
    },
    {
      provide: APP_INITIALIZER,
      useFactory: startupServiceFactory,
      deps: [CountriesService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

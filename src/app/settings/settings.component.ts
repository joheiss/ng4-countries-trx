import { Component, OnInit } from '@angular/core';
import {SearchCriteria, SortCriteria} from '../countries/country';
import {CountriesService} from '../countries/countries.service';
import {Location} from '@angular/common';
import {MatCheckboxChange} from '@angular/material';

@Component({
  selector: 'jo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  continentSelections = [
    { name: 'africa', description: 'Africa' },
    { name: 'america', description: 'Americas' },
    { name: 'asia', description: 'Asia' },
    { name: 'australia', description: 'Australia' },
    { name: 'europe', description: 'Europe' },
    { name: 'antarctica', description: 'Antarctica' },
    { name: 'none', description: 'None' }
  ];

  orderByOptions = [
    { name: 'name', description: 'Country Name' },
    { name: 'alpha3Code', description: 'ISO Code' },
    { name: 'region', description: 'Region' },
    { name: 'subregion', description: 'Sub Region' },
    { name: 'population', description: 'Population' },
    { name: 'area', description: 'Area Size' },
    { name: 'gini', description: 'Gini Index' },
    { name: 'numericCode', description: 'Numeric Code' },
  ];

  searchCriteria: SearchCriteria;
  sortCriteria: SortCriteria;

  constructor(private service: CountriesService,
              private location: Location) { }

  ngOnInit() {
    this.searchCriteria = this.service.searchCriteria;
    this.sortCriteria = this.service.sortCriteria;
  }

  onBack() {
    this.service.setSearchAndSortCriteria(this.searchCriteria, this.sortCriteria);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  onToggleContinent(event: MatCheckboxChange) {
    console.log('Toggle continent: ', event);
    this.searchCriteria[event.source.id] = event.checked;
  }

  onToggleDirection(event) {
    this.sortCriteria.direction = event.value;
  }

  onToggleOrderBy(event) {
    this.sortCriteria.fieldName = event.value;
  }
}

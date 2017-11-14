import { Component, OnInit } from '@angular/core';
import {SearchCriteria, SortCriteria} from '../countries/country';
import {CountriesService} from '../countries/countries.service';
import {Location} from '@angular/common';
import {MatCheckboxChange} from '@angular/material';
import { find } from 'lodash';

@Component({
  selector: 'jo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  continentSelections: any;
  orderByOptions: any;
  searchCriteria: SearchCriteria;
  sortCriteria: SortCriteria;

  constructor(private service: CountriesService,
              private location: Location) { }

  ngOnInit() {
    this.searchCriteria = this.service.searchCriteria;
    this.sortCriteria = this.service.sortCriteria;
    this.continentSelections = this.service.continentSelections;
    this.orderByOptions = this.service.orderByOptions;
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

export class CountriesSortCriteria {

  constructor(public fieldName: string = 'name',
              public direction: string = 'asc',
              public isRankDisplayed: boolean = false) {}
}

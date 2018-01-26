export class CountriesSearchCriteria {

  constructor(public term: string = '',
              public africa: boolean = true,
              public antarctica: boolean = true,
              public asia: boolean = true,
              public australia: boolean = true,
              public america: boolean = true,
              public europe: boolean = true,
              public none: boolean = true) {
  }

  public getListOfContinentsToSearchFor(): string[] {

    const continents = [];
    if (this.africa) {
      continents.push('africa');
    }
    if (this.america) {
      continents.push('americas');
    }
    if (this.asia) {
      continents.push('asia');
    }
    if (this.australia) {
      continents.push('oceania');
    }
    if (this.antarctica) {
      continents.push('polar');
    }
    if (this.europe) {
      continents.push('europe');
    }
    if (this.none) {
      continents.push('none');
    }
    return continents;
  }
}

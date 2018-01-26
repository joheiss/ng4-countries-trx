export class Utilities {

  public static replaceSpecialCharacters(value: string): string {
    value = value.toLocaleLowerCase();
    value = value.replace(/\u00e4/g, 'ae');
    value = value.replace(/\u00f6/g, 'oe');
    value = value.replace(/\u00fc/g, 'ue');
    value = value.replace(/\u00df/g, 'ss');
    value = value.replace(/\u00e5/g, 'a');
    return value;
  }
}

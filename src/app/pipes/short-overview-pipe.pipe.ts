import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortOverview',
  pure: true,
  standalone: true
})
export class ShortOverviewPipe implements PipeTransform {

  private _defaultCountOfWords: number = 10;

  transform(value: string | undefined, countOfWords: number): string {
    if (!value)
      return '';
    if (countOfWords == 0 || countOfWords == undefined)
      countOfWords = this._defaultCountOfWords;

    let words: string[] = value.split(' ');
    if (words.length <= countOfWords)
      return value;

    return words.slice(0, countOfWords).join(' ') + '...';
  }

}

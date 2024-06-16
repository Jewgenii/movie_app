import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortOverview',
  standalone: true
})
export class ShortOverviewPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(!value)
      return '';
    let str: string = value as string;
    let words: string[] = str.split(' ');
    if(words.length <= 10)
      return str;

    return words.slice(0, 10).join(' ') + '...';
  }

}

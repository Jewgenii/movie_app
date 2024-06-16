import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeText',
  standalone: true,
  pure: true
})
export class CapitalizeTextPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if(value === null || value === undefined)
      return '';
    return value.toString().toUpperCase();
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeText',
  standalone: true,
  pure: true
})
export class CapitalizeTextPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === null || value === undefined)
      return '';
    return value.toString().toUpperCase();
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizeImagePath',
  pure: true,
  standalone: true
})
export class LocalizeImagePathPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    if (!value) return '';

    var imagePath = value;

    if (value.startsWith('/')) {
      imagePath = value.substring(1);
    }

    return 'assets/images/' + imagePath;
  }
}

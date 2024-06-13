import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizeImagePath',
  pure: true,
  standalone: true
})
export class LocalizeImagePathPipe implements PipeTransform {

  private imagesPath: string = 'assets/images/';

  transform(value: string, ...args: any[]): string {
    if (!value) return '';
    return `${this.imagesPath}${this.getFileNameFromPath(value)}`;
  }

  private getFileNameFromPath(path: string): string | null {
    const regex = /[^\\/]+$/;
    const match = path.match(regex);
    return match ? match[0] : '';
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localizeImagePath',
  pure: true,
  standalone: true
})
export class LocalizeImagePathPipe implements PipeTransform {

  private imagesPath: string = 'https://image.tmdb.org/t/p/w500/';

  transform(value: string | undefined, ...relativePath: string[]): string {
    if (!value) return '';

    return `${this.imagesPath}${this.getFileNameFromPath(value)}`;
  }

  private getFileNameFromPath(path: string): string | null {
    const regex = /[^\\/]+$/;
    const match = path.match(regex);
    return match ? match[0] : '';
  }
}

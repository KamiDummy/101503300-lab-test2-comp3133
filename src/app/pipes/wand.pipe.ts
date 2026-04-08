import { Pipe, PipeTransform } from '@angular/core';
import { Wand } from '../models/character';

@Pipe({
  name: 'wand',
  standalone: false
})
export class WandPipe implements PipeTransform {

  transform(value: Wand | null | undefined): string {
    if (!value) {
      return 'Unknown';
    }
    const wood = value.wood || 'Unknown';
    const core = value.core || 'Unknown';
    const length = value.length ? value.length + ' inches' : 'Unknown length';
    return wood + ' / ' + core + ' / ' + length;
  }

}

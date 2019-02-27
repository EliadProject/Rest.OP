import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toPercent'})
export class toPercentPipe implements PipeTransform {
  transform(value: number): number {
    return value*100
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true,
})
export class PriceFormatPipe implements PipeTransform {
  public transform(
    value: number,
    currencySign?: string,
    chunkDelimiter?: string
  ): string {
    if (!currencySign && currencySign !== '') {
      currencySign = 'Rp ';
    }
    if (!chunkDelimiter) {
      chunkDelimiter = '.';
    }
    const num = Math.round(value);
    return (
      currencySign +
      num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, chunkDelimiter)
    );
  }
}

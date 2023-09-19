import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToMonthYear'
})
export class DateToMonthYearPipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // Transform method to filter the items based on searchObj
  transform(items: any, searchObj: any): any {
    if (!items) return []; // Return an empty array

    return items.filter((item: any) => {
      // Check if the item's title matches the searchObj title
      const matchesTitle = !searchObj?.title || item?.title?.toLowerCase().includes(searchObj?.title?.toLowerCase());
      // Check if the item's recurring type matches the searchObj recurring type
      const matchesRecurringType = !searchObj?.recurringTypeValue || item?.recurringType?.toLowerCase() === searchObj?.recurringTypeValue?.toLowerCase();
      // Check if the item's created date falls within the specified date range
      const matchesDateRange = !searchObj?.startDate || !searchObj?.endDate || (
        new Date(item?.createdDate) >= new Date(searchObj?.startDate) &&
        new Date(item?.createdDate) <= new Date(searchObj?.endDate)
      );

      return matchesTitle && matchesRecurringType && matchesDateRange;
    });
  }
}

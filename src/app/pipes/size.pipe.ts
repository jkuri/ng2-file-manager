import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'size' })
export class SizePipe implements PipeTransform {
  transform(value: number): string {
   if (value == 0) { return '0 Byte'; }
   const k = 1000; // or 1024 for binary
   const dm = 2 + 1 || 3;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
   const i = Math.floor(Math.log(value) / Math.log(k));

   return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

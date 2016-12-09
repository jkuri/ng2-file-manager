import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {
  public inputEvents: EventEmitter<any> = new EventEmitter();
  public outputEvents: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.inputEvents.subscribe(data => {
      this.outputEvents.emit(data);
    });
  }
}

export const NotificationProvider = { provide: NotificationService, useClass: NotificationService };

import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: 'app-header.component.html'
})
export class AppHeader {
  private message: string;
  private class: string;
  private visible: boolean = false;
  private timeout: any;

  constructor(private notification: NotificationService) {
    this.notification.outputEvents.subscribe(data => {
      this.message = data.message;
      this.class = data.class;
      this.showMessage();
    });
  }

  showMessage() {
    if (this.visible) {
      this.visible = false;
      clearTimeout(this.timeout);
    }

    this.visible = true;
    this.timeout = setTimeout(() => {
      this.visible = false;
    }, 4000);
  }
}

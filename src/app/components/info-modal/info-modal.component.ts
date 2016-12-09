import { Component, Input, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'info-modal',
  templateUrl: 'info-modal.component.html'
})
export class InfoModalComponent implements OnInit {
  @Input() opened: boolean = false;
  @Input() fileType: string;
  @Input() filePath: string[];
  @Input() events: EventEmitter<any>;

  private infoName: string;
  private infoPath: string;
  private infoSize: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.events.subscribe(data => {
      if (data === 'open') {
        let path = this.filePath.slice();
        this.infoPath = path.join('/');
        this.infoName = path.pop();
        if (!this.infoPath) { this.infoPath = '/'; }
        if (!this.infoName) { this.infoName = 'root'; }
        this.opened = true;
        this.api.getFolderSize(this.infoPath).subscribe(resp => {
          this.infoSize = resp.data;
        });
      }
    });
  }

  close() {
    this.opened = false;
    this.infoSize = null;
  }

}

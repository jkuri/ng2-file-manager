import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'delete-modal',
  templateUrl: 'delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
  @Input() events: EventEmitter<any>;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  private progress: boolean = false;
  private fullPath: string[];
  private name: string;
  private type: string;
  private opened: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.events.subscribe(data => {
      this.fullPath = data.path.slice();
      let filePath = data.path.slice();
      this.name = filePath.pop();
      this.type = data.type === 'dir' ? 'directory' : 'file';
      this.progress = false;
      this.opened = true;
    });

    let body = document.querySelector('body');
    body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  }

  delete() {
    this.progress = true;
    this.api.deleteFileOrFolder(this.fullPath.join('/')).subscribe(data => {
      this.onDelete.emit(this.name);
      this.opened = false;
    });
  }

  close() {
    this.opened = false;
  }
}

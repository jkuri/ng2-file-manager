import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

class Model {
  public name;
  public path;
  public action;

  constructor(obj?: any) {
    this.name = obj && obj.name ? obj.name : null;
    this.path = obj && obj.path ? obj.path : null;
    this.action = obj && obj.action ? obj.action : null;
  }
}

@Component({
  selector: 'edit-modal',
  templateUrl: 'edit-modal.component.html'
})
export class EditModalComponent implements OnInit {
  @Input() events: EventEmitter<any>;
  @Input() data: any;
  @Output() onEdit: EventEmitter<any> = new EventEmitter();

  private progress: boolean = false;
  private initialPath: string;
  private opened: boolean = false;
  private model: Model;
  private old: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.events.subscribe(data => {
      this.progress = false;
      this.initialPath = data.path;
      this.model = new Model(data);
      this.old = data.path;
      this.opened = true;
    });

    let body = document.querySelector('body');
    body.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  }

  save(e: Event) {
    e.preventDefault();
    this.progress = true;
    if (this.model.action === 'add') {
      this.api.newFolder(this.initialPath, this.model.name).subscribe(data => {
        this.onEdit.emit({ action: 'added', name: data });
        this.close();
      });
    } else if (this.model.action === 'rename') {
      this.api.renameFolder(this.model.path, this.old).subscribe(data => {
        this.onEdit.emit({ action: 'edited', name: data });
        this.close();
      });
    }
  }

  onChange(path: string) {
    if (this.old) {
      let newPath = this.old.split('/').slice(0, -1).join('/');
      this.model.path = `${newPath}/${this.model.name}`;
    } else {
      this.model.path = `${this.initialPath}/${path}`;
    }
  }

  close() {
    this.opened = false;
  }
}

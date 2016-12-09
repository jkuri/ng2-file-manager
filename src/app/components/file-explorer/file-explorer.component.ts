import { Component, OnInit, EventEmitter } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationService } from '../../services/notification.service';
import { File } from '../../classes/file.class';
import 'prismjs/prism';

declare const Prism: any;

@Component({
  selector: 'file-explorer',
  templateUrl: 'file-explorer.component.html'
})
export class FileExplorer implements OnInit {
  private path: string[] = [];
  private fileContent: string;
  private files: File[] = [];
  private all: File[] = [];
  private fileType: string = null;
  private type: string = 'all';
  private folderSize: number;
  private folderLoading: boolean = true;
  private infoEvent: EventEmitter<any> = new EventEmitter();
  private deleteEvent: EventEmitter<any> = new EventEmitter();
  private editEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    public api: ApiService,
    public router: Router,
    public route: ActivatedRoute,
    public notification: NotificationService) { }

  onItemClick(i) {
    this.path.push(this.files[i].name);
    this.navigate();
    this.scrollTop();
    this.fetchFiles();
  }

  goToPath(i) {
    if (i === this.path.length) { return ; }
    this.path = this.path.splice(0, i);
    this.navigate();
    this.scrollTop();
    this.fetchFiles();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.hasOwnProperty('path')) {
        this.path = params['path'].split('/');
      }
      this.navigate();
      this.fetchFiles();
    });
  }

  navigate() {
    let path = this.path.join('/');
    let navigationExtras: NavigationExtras = {
      queryParams: { 'path': path }
    };
    this.router.navigate([''], navigationExtras);
  }

  fetchFiles() {
    this.type = 'all';
    this.folderSize = null;
    this.folderLoading = true;
    this.api.getFiles(this.path.join('/')).subscribe(resp => {
      this.folderLoading = false;
      this.fileType = resp.type;
      if (this.fileType === 'dir') {
        this.files = this.all = resp.data.filter(file => {
          return !file.name.startsWith('.');
        })
        .sort(this.sortByIsDirAndName);
      } else {
        this.files = this.all = [];
        this.fileContent = resp.data;
        setTimeout(() => {
          Prism.highlightAll();
        });
      }
    });
  }

  fetchFolderSize() {
    this.api.getFolderSize(this.path.join('/')).subscribe(resp => {
      this.folderSize = resp.data;
    });
  }

  selectType(type: string) {
    this.type = type;

    if (this.type === 'all') {
      this.files = this.all;
    } else if (this.type === 'files') {
      this.files = this.all.filter(f => f.isFile);
    } else if (this.type === 'folders') {
      this.files = this.all.filter(f => f.isDir);
    } else if (this.type === 'photos') {
      this.files = this.all.filter(f => f.mime.includes('image'));
    }
  }

  copyToClipboard() {
    this.notification.inputEvents.emit({
      class: 'success',
      message: 'Copied to clipboard.'
    });
  }

  sortByIsDirAndName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (a.isDir > b.isDir) { return -1; }
    if (a.isDir < b.isDir) { return 1; }
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;
  }

  sortByIsDir(a, b) {
    if (a.isDir > b.isDir) { return -1; }
    if (a.isDir < b.isDir) { return 1; }
    return 0;
  }

  sortByName(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) { return -1; }
    if (nameA > nameB) { return 1; }
    return 0;
  }

  openInfo() {
    this.infoEvent.emit('open');
  }

  deleteModal() {
    this.deleteEvent.emit({
      path: this.path,
      type: this.fileType
    });
  }

  onDeleteHandler(name: string) {
    this.notification.inputEvents.emit({
      class: 'danger',
      message: `${name} deleted.`
    });
    this.path.pop();
    this.navigate();
    this.fetchFiles();
  }

  editModal(action: string) {
    let path = this.path.slice();
    let data = {
      action: action,
      path: path.join('/'),
      name: action === 'add' ? null : path.pop()
    };
    this.editEvent.emit(data);
  }

  onEditHandler(data: any) {
    let emitData = {
      class: 'success',
      message: `Saved.`
    };
    this.notification.inputEvents.emit(emitData);
    if (data.action === 'edited') {
      this.path.pop();
      this.navigate();
    }
    this.fetchFiles();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
}

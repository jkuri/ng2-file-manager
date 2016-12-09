import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dev-icon',
  templateUrl: 'dev-icon.component.html'
})
export class DevIconComponent implements OnInit {
  @Input() mime: string;
  @Input() name: string;

  private type: string;

  ngOnInit() {
    let ext: string = this.name.split('.').pop();
    this.type = ext;
  }
}

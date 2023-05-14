import { Component, Input } from '@angular/core';
import { Tag } from 'src/models/tag.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent {
  @Input() tag: Tag;
  @Input() removeable: boolean = true;
  @Input() editable: boolean = false;

  name(): string {
    if (this.tag) {
      return this.tag.name;
    }
  }

  edit(): void {
    if (this.editable) {
      console.log('EDIT ' + this.tag.name);
    }
  }

  remove(): void {
    if (this.removeable) {
      console.log('REMOVE ' + this.tag.name);
    }
  }
}

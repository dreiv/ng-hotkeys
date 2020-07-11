import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hotkeys-dialog',
  templateUrl: './hotkeys-dialog.component.html',
  styleUrls: ['./hotkeys-dialog.component.css']
})
export class HotkeysDialogComponent {
  hotkeys: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.hotkeys = Array.from(this.data);
  }
}

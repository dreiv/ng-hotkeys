import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HotkeysDialogComponent } from './hotkeys-dialog/hotkeys-dialog.component';

@NgModule({
  declarations: [AppComponent, HotkeysDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCommonModule,
    MatDialogModule
  ],
  entryComponents: [HotkeysDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventManager } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';

import { HotkeysDialogComponent } from './hotkeys-dialog/hotkeys-dialog.component';

type Options = {
  element: any;
  keys: string;
  description?: string;
};

@Injectable({
  providedIn: 'root'
})
export class HotkeysService implements OnDestroy {
  private unsubscribe$: Subject<void>;

  hotkeys = new Map();
  defaults: Partial<Options> = {
    element: this.document
  };

  constructor(
    private eventManager: EventManager,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.unsubscribe$ = new Subject();

    this.addShortcut({ keys: 'shift.G' }).subscribe(() => {
      this.openHelpModal();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  addShortcut(options: Partial<Options>): Observable<KeyboardEvent> {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

    if (merged.description) {
      this.hotkeys.set(merged.keys, merged.description);
    }

    return new Observable((observer) => {
      const handler = (e: KeyboardEvent) => {
        e.preventDefault();

        observer.next(e);
      };

      const dispose = this.eventManager.addEventListener(
        merged.element,
        event,
        handler
      );

      return () => {
        dispose();

        this.hotkeys.delete(merged.keys);
      };
    });
  }

  openHelpModal(): void {
    this.dialog.open(HotkeysDialogComponent, {
      width: '500px',
      data: this.hotkeys
    });
  }
}

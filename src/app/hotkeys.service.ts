import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';

type Options = {
  element: any;
  keys: string;
  description?: string;
};

@Injectable({
  providedIn: 'root'
})
export class HotkeysService {
  defaults: Partial<Options> = {
    element: this.document
  };

  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document: Document
  ) {}

  addShortcut(options: Partial<Options>): Observable<KeyboardEvent> {
    const merged = { ...this.defaults, ...options };
    const event = `keydown.${merged.keys}`;

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
      };
    });
  }
}

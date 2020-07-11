import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { HotkeysService } from './hotkeys.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void>;

  constructor(private hotkeys: HotkeysService) {
    this.unsubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.hotkeys
      .addShortcut({ keys: 'shift.Z', description: 'Add Widget' })
      .pipe(takeUntil(this.unsubscribe$), take(2))
      .subscribe(console.log);

    this.hotkeys
      .addShortcut({ keys: 'shift.J', description: 'Open Settings' })
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}

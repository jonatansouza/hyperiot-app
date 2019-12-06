import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, timer } from 'rxjs';
import { switchMap,  tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private evt = new EventEmitter();
  private duration = 3000;
  constructor(private msb: MatSnackBar) {
    this.evt.subscribe((msg: string) => {
      this.msb.open(msg, 'Fechar', {
        duration: this.duration
      });
    });
  }
  public notify(message: string) {
    this.evt.emit(message);
  }
}

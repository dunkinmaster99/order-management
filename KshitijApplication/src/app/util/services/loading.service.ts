import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();
  private spinner = new BehaviorSubject<string>('');
  private count = 0;

  constructor() { }

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }
  getSpinnerObserver(): Observable<string> {
    return this.spinner.asObservable();
  }
  requestStarted() {
    if (++this.count === 1) {
      this.spinner.next('start');
    }
  }
  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner.next('stop');
    }

  }
  resetSpinner() {
    this.count = 0;
    this.spinner.next('stop');
  }
}
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderStatus = new BehaviorSubject(false)

  constructor() { }

  show() {
    this.loaderStatus.next(true);
  }

  hide() {
    this.loaderStatus.next(false);
  }
}



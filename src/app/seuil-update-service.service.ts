// seuil-update.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeuilUpdateService {
  private displayFormSubject = new BehaviorSubject<boolean>(false);
  displayForm$ = this.displayFormSubject.asObservable();

  constructor() {}

  showForm() {
    this.displayFormSubject.next(true);
  }

  hideForm() {
    this.displayFormSubject.next(false);
  }
}

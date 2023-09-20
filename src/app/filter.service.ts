// filter.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private filterCriteriaSubject = new BehaviorSubject<any>({});
  filterCriteria$: Observable<any> = this.filterCriteriaSubject.asObservable();

  setFilterCriteria(criteria: any) {
    this.filterCriteriaSubject.next(criteria);
  }
}

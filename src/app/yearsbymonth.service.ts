import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YearsByMonthService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getRelativeYearsByMonth(month: string): Observable<number[]> {
    const url = `${this.apiUrl}/relativeYears/${month}`;
    return this.http.get<number[]>(url);
  }
}

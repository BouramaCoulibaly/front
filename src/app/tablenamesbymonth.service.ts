import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableNamesByMonthService {
  private apiUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) {}

  getRelativeTableNamesByMonth(month: string): Observable<string[]> {
    const url = `${this.apiUrl}/relativeTableNames/${month}`;
    return this.http.get<string[]>(url);
  }
}

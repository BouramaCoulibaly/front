import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YearsbytablenameService {
  private baseUrl = 'http://localhost:8082/api'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  getRelativeYearsByTableName(tableName: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/relativeYears/year/${tableName}`);
  }
}

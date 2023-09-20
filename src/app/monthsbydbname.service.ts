import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MonthsByDbnameService {
  private baseUrl = 'http://localhost:8082/api'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  getRelativeMonthsByDbname(dbname: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/relativeMonthsByDbname/${dbname}`);
  }
}

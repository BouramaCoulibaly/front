import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YearService {
  private baseUrl = 'http://localhost:8082/api'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  getYears(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/uniqueYears`);
  }
  
}

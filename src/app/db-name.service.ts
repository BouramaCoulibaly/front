import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DbNameService {
  private baseUrl = 'http://localhost:8082/api'; // Change this to your backend URL

  constructor(private http: HttpClient) {}

  getUniqueDbNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/uniqueDbNames`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableNameService {
  private baseUrl = 'http://localhost:8082/api'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  getRelatedTableNames(dbName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/relatedTableNames/${dbName}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UniqueDbNameByTableNameService {
  private baseUrl = 'http://localhost:8082/api'; // Replace with your backend API base URL

  constructor(private http: HttpClient) {}

  getUniqueDbNamesByTableName(tableName: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/uniqueDbNamesByTableName/${tableName}`);
  }
}

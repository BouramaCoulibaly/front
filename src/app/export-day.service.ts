import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportDayService {
  private baseUrl = 'http://localhost:8082/api';
  constructor(private http: HttpClient) {}

  getUniqueExportDays(): Observable<Date[]> {
    return this.http.get<Date[]>(`${this.baseUrl}/uniqueExportDays`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KpiDataService {
  private baseUrl = 'http://localhost:8082/api'; // 

  constructor(private http: HttpClient) {}

  // 

  updateSeuilForFilteredData(filterCriteria: any): Observable<any> {
    const url = `${this.baseUrl}/updateSeuil`; //
    return this.http.put(url, filterCriteria);
  }
}

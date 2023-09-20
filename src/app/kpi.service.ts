import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private apiUrl = 'http://localhost:8082/api/file_info'; 
 // private apiiUrl = 'http://localhost:8082/api/';
  constructor(private http: HttpClient) {}
  //

  getKpiData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeuilService {
  private apiUrl = 'http://localhost:8082/api'; 

  constructor(private http: HttpClient) {}

  updateSeuil(data: any): Observable<any> {
    // Send an HTTP POST request to update the Seuil value
    return this.http.post('http://localhost:8082/api/updateSeuil', data);
  }
}

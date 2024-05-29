import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoContribuyenteService {
  private apiUrl = 'http://localhost:3000/api/tipoContribuyente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.get(this.apiUrl, { headers });
  }

  create(tipoContribuyente: any): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.post(this.apiUrl, tipoContribuyente, { headers });
  }

  update(id: number, tipoContribuyente: any): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.put(`${this.apiUrl}/${id}`, tipoContribuyente, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private apiUrl = 'http://localhost:3000/api/tipoDocumento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.get(this.apiUrl, { headers });
  }

  create(tipoDocumento: any): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.post(this.apiUrl, tipoDocumento, { headers });
  }

  update(id: number, tipoDocumento: any): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.put(`${this.apiUrl}/${id}`, tipoDocumento, { headers });
  }

  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': localStorage.getItem('token') || '' });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}
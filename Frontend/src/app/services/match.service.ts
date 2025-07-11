import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MatchService {
  constructor(private http: HttpClient) { }

  getMatches(): Observable<any> {
    return this.http.get('/api/match');
  }

  createMatch(data: any): Observable<any> {
    return this.http.post('/api/match', data);
  }

  updateMatch(id: string, data: any): Observable<any> {
    return this.http.put(`/api/match/${id}`, data);
  }

  deleteMatch(id: string): Observable<any> {
    return this.http.delete(`/api/match/${id}`);
  }
} 
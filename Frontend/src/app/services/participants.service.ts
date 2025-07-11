import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  constructor(private http: HttpClient) { }

  getParticipants(): Observable<any> {
    return this.http.get('/api/partecipants');
  }
} 
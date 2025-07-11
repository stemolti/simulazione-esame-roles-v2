import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  constructor(private http: HttpClient) { }

  joinTournament(): Observable<any> {
    return this.http.post('/api/tournament/subscribe', {});
  }

  becomeOrganizer(): Observable<any> {
    return this.http.post('/api/tournament/set-organizer', {});
  }
} 
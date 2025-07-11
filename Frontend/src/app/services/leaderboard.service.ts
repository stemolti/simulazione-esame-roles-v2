import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaderboardService {
  constructor(private http: HttpClient) { }

  getLeaderboardData(): Observable<any> {
    // Fetch both matches and participants for leaderboard computation
    return forkJoin({
      matches: this.http.get('/api/match'),
      participants: this.http.get('/api/partecipants')
    });
  }
} 
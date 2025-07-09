import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class TournamentService {
  private readonly api = `${environment.apiUrl}/tournament`;

  constructor(private http: HttpClient) { }

  subscribe(): Observable<User> {
    return this.http.post<User>(`${this.api}/subscribe`, {});
  }

  setOrganizer(): Observable<User> {
    return this.http.post<User>(`${this.api}/iam-an-organizer`, {});
  }
}

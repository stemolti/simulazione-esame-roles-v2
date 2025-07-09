import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  private readonly api = `${environment.apiUrl}/partecipants`;

  constructor(private http: HttpClient) { }

  list(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }
}

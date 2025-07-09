import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';
import { Observable } from 'rxjs';
import { Match } from '../interfaces/match';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private readonly api = `${environment.apiUrl}/match`;

  constructor(private http: HttpClient) { }

  list(): Observable<Match[]> {
    return this.http.get<Match[]>(this.api);
  }

  create(match: Partial<Match>) {
    return this.http.post<Match>(this.api, match);
  }

  update(id: string, match: Partial<Match>) {
    return this.http.put<Match>(`${this.api}/${id}`, match);
  }

  remove(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
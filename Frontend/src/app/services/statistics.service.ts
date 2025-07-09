import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../secrets';

export interface EventStats {
  eventId: string;
  title: string;
  date: string;
  totalRegistrations: number;
  totalCheckins: number;
  participationRate: number;
}
@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private http: HttpClient) {}

  getEventStatistics(from?: string, to?: string): Observable<EventStats[]> {
    let params = new HttpParams();
    if (from) params = params.set('from', from);
    if (to) params = params.set('to', to);
    return this.http.get<EventStats[]>(`${apiUrl}/statistics/events`, {
      params,
    });
  }
}

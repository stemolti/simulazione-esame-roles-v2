import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../../secrets';
import { AppEvent, Registration } from '../interfaces/event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${apiUrl}/events`);
  }

  createEvent(eventData: { title: string; description: string; date: string }) {
    return this.http.post(`${apiUrl}/events`, eventData);
  }

  updateEvent(id: string, eventData: any) {
    return this.http.put(`${apiUrl}/events/${id}`, eventData);
  }

  deleteEvent(id: string) {
    return this.http.delete(`${apiUrl}/events/${id}`);
  }

  getEventById(id: string): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${apiUrl}/events/${id}`);
  }

  getRegisteredEventsForUser(): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${apiUrl}/registration/mine`);
  }

  registerToEvent(eventId: string) {
    return this.http.post(`${apiUrl}/registration`, { event: eventId });
  }

  unregisterFromEvent(eventId: string) {
    return this.http.delete(`${apiUrl}/registration/${eventId}`);
  }

  isUserRegistered(eventId: string) {
    return this.http.get<{ registered: boolean }>(
      `${apiUrl}/registration/check/${eventId}`
    );
  }

  performCheckin(userId: string, eventId: string): Observable<any> {
    return this.http.post(
      `${apiUrl}/registration/checkin/${userId}/${eventId}`,
      {}
    );
  }

  getUserRegistrations(userId: string): Observable<Registration[]> {
    return this.http.get<Registration[]>(
      `${apiUrl}/registration/user/${userId}`
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment';
import { User } from '../interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = `${environment.apiUrl}/users`;
  private user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) this.loadProfile().subscribe();
  }

  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.api}/login`, { username, password })
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);
          this.loadProfile().subscribe();
        }),
      );
  }

  register(data: Partial<User> & { password: string }) {
    return this.http.post<User>(`${this.api}/register`, data);
  }

  loadProfile() {
    return this.http.get<User>(`${this.api}/me`).pipe(
      tap((u) => this.user$.next(u)),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.user$.next(null);
  }

  userChanges() {
    return this.user$.asObservable();
  }

  get user(): User | null {
    return this.user$.value;
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  get isAuthenticated(): boolean {
    return !!this.token;
  }
}

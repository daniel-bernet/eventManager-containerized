import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = '/api';
  public userId: string | null = null;
  public username: string | null = null;

  constructor(private http: HttpClient) {}

  private storeUserData(userData: { username: string; user_id: string }): void {
    this.username = userData.username;
    this.userId = userData.user_id;
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/user/login`, userData).pipe(
      tap((response) => {
        if (response.username && response.user_id) {
          this.storeUserData(response);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/user/register`, userData).pipe(
      tap((response) => {
        if (response.username && response.user_id) {
          this.storeUserData(response);
        }
      })
    );
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.baseURL}/user/delete`)
  }

  createEvent(eventData: any): Observable<any> {
    eventData.user_id = this.userId;
    return this.http.post(`${this.baseURL}/event/create`, eventData);
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/event/delete`, {
      body: { event_id: eventId },
    });
  }

  signInEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/event/sign-in`, {
      event_id: eventId,
      user_id: this.userId,
    });
  }

  signOutEvent(eventId: string): Observable<any> {
    return this.http.post(`${this.baseURL}/event/sign-out`, {
      event_id: eventId,
      user_id: this.userId,
    });
  }

  getAllEvents(): Observable<any> {
    return this.http.get(`${this.baseURL}/event/get-all`);
  }

  searchEvents(query: string): Observable<any> {
    return this.http.get(`${this.baseURL}/event/search`, { params: { query } });
  }

  getDashboardSummary(): Observable<any> {
    return this.http.get(`${this.baseURL}/event/dashboard`);
  }
}

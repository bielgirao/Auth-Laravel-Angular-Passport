import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    this.updateLoggedInStatus();
  }

  private updateLoggedInStatus() {
    const token = localStorage.getItem('token');
    this.loggedInSubject.next(token !== null);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  login(token: string) {
    localStorage.setItem('token', token);
    this.updateLoggedInStatus();
  }

  logout() {
    localStorage.removeItem('token');
    this.updateLoggedInStatus();
  }
}

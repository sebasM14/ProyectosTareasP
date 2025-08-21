import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private currentUser: any = null;

  constructor(private router: Router) {
    this.checkAuthStatus();

    
  }

  login(username: string, password: string): Observable<boolean> {
  
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        this.isAuthenticated = true;
        this.currentUser = {
          username: username,
          name: 'Usuario Demo'
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        
        console.log('Login exitoso para usuario:', username);
        observer.next(true); 
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  private checkAuthStatus(): void {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('currentUser');
    
    if (authStatus === 'true' && userData) {
      this.isAuthenticated = true;
      this.currentUser = JSON.parse(userData);
    }
  }
}
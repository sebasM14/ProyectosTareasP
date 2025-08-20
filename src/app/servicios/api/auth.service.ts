import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private isAuthenticated = false;
  constructor() { 
    this.checkAuthStatus();
  
}   
login(username: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        observer.next(true);
        observer.complete();
      }, 1000);
    });

  }

  	logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


    private checkAuthStatus():void  {
    const authStatus = localStorage.getItem('isAuthenticated');
    this.isAuthenticated = authStatus === 'true';}
}

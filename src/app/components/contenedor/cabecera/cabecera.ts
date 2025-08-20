import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../servicios/api/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  standalone: false,
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css'
})
export class Cabecera  implements OnInit     {
 isAuthenticated = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUser();
  }

  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
    this.isAuthenticated = false;
    this.currentUser = null;
  }
}

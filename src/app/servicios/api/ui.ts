import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private mostrarMenuSubject = new BehaviorSubject<boolean>(false);
  public mostrarMenu$: Observable<boolean> = this.mostrarMenuSubject.asObservable();

  constructor() {
    // Verificar estado inicial
    const estaAutenticado = localStorage.getItem('isAuthenticated') === 'true';
    this.mostrarMenuSubject.next(estaAutenticado);
  }

  mostrarMenu(mostrar: boolean): void {
    this.mostrarMenuSubject.next(mostrar);
  }

  toggleMenu(): void {
    this.mostrarMenuSubject.next(!this.mostrarMenuSubject.value);
  }

  obtenerEstadoMenu(): boolean {
    return this.mostrarMenuSubject.value;
  }
}
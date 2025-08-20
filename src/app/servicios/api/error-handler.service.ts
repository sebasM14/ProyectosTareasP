import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Maneja errores HTTP y muestra un mensaje al usuario
   * @param error El error HTTP recibido
   * @param customMessage Mensaje personalizado opcional
   */
  handleError(error: HttpErrorResponse, customMessage?: string): void {
    console.error('Error occurred:', error);
    
    let errorMessage = customMessage || 'Ocurrió un error inesperado';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          errorMessage = 'No hay conexión a internet';
          break;
        case 400:
          errorMessage = 'Solicitud incorrecta';
          break;
        case 401:
          errorMessage = 'No autorizado';
          break;
        case 403:
          errorMessage = 'Acceso prohibido';
          break;
        case 404:
          errorMessage = 'Recurso no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    this.mostrarError(errorMessage);
  }

  /**
   * Muestra un mensaje de error usando Angular Material Snackbar
   * @param message Mensaje a mostrar
   */
  private mostrarError(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  /**
   * Muestra un mensaje de éxito
   * @param message Mensaje a mostrar
   */
  mostrarExito(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  /**
   * Muestra un mensaje de advertencia
   * @param message Mensaje a mostrar
   */
  mostrarAdvertencia(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 4000,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
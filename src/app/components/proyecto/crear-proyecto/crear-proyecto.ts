import { Component } from '@angular/core';
import { ApiService } from '../../../servicios/api/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-proyecto',
  standalone: false,
  templateUrl: './crear-proyecto.html',
  styleUrl: './crear-proyecto.css'
})
export class CrearProyecto {
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onGuardarProyecto(proyectoData: any): void {
    this.apiService.crearProyecto(proyectoData).subscribe({
      next: () => {
        this.snackBar.open('Proyecto creado correctamente', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['/proyectos']);
      },
      error: (error) => {
        console.error('Error creando proyecto:', error);
        this.snackBar.open('Error al crear el proyecto', 'Cerrar', {
          duration: 3000
        });
      }
    });
  }

  onCancelar(): void {
    this.router.navigate(['/proyectos']);
  }


}

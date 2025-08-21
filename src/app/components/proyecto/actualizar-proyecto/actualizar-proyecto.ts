import { Component, OnInit } from '@angular/core';
import { Proyectos } from '../../../models/proyectos';
import { ApiService } from '../../../servicios/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-proyecto',
  standalone: false,
  templateUrl: './actualizar-proyecto.html',
  styleUrl: './actualizar-proyecto.css'
})
export class ActualizarProyecto implements OnInit {
  proyectoId!: number;
  proyecto!: Proyectos;
  isLoading = true;

  constructor(
    private apiService: ApiService  ,
    private router: Router  ,
    private route: ActivatedRoute ,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.proyectoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarProyecto();
  }

  cargarProyecto(): void {
    this.isLoading = true;
    this.apiService.obtenerProyecto(this.proyectoId).subscribe({
      next: (proyecto) => {
        this.proyecto = proyecto;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando proyecto:', error);
        this.snackBar.open('Error al cargar el proyecto', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
        this.router.navigate(['/proyectos']);
      }
    });
  }

  onGuardarProyecto(proyectoData: Partial<Proyectos>): void {
    this.apiService.actualizarProyecto(this.proyectoId, proyectoData).subscribe({
      next: (proyectoActualizado) => {
        console.log('Proyecto actualizado:', proyectoActualizado);
        this.snackBar.open('Proyecto actualizado correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.router.navigate(['/proyectos']);
      },
      error: (error) => {
        console.error('Error actualizando proyecto:', error);
        this.snackBar.open('Error al actualizar el proyecto', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onCancelar(): void {
    this.router.navigate(['/proyectos']);
  }
   volverAProyectos(): void {
    this.router.navigate(['/proyectos']);
  }
}

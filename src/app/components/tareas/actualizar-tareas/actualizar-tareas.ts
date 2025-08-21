import { Component, OnInit } from '@angular/core';
import { Tareas } from '../../../models/tareas';
import { ApiService } from '../../../servicios/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-tareas',
  standalone: false,
  templateUrl: './actualizar-tareas.html',
  styleUrl: './actualizar-tareas.css'
})
export class ActualizarTareas implements OnInit {
  tareaId!: number;
  proyectoId!: number;
  tarea!: Tareas;
  isLoading = true;

  constructor(
    private apiService: ApiService  ,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.tareaId = +this.route.snapshot.paramMap.get('id')!;
    this.proyectoId = +this.route.snapshot.parent?.paramMap.get('id')!;
    this.cargarTarea();
  }

  cargarTarea(): void {
    this.isLoading = true;
    this.apiService.obtenerTarea(this.tareaId).subscribe({
      next: (tarea) => {
        this.tarea = tarea;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando tarea:', error);
        this.snackBar.open('Error al cargar la tarea', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
        this.volverATareas();
      }
    });
  }

  onGuardarTarea(tareaData: Partial<Tareas>): void {
    this.apiService.actualizarTarea(this.tareaId, tareaData).subscribe({
      next: (tareaActualizada) => {
        console.log('Tarea actualizada:', tareaActualizada);
        this.snackBar.open('Tarea actualizada correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.volverATareas();
      },
      error: (error) => {
        console.error('Error actualizando tarea:', error);
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onCancelar(): void {
    this.volverATareas();
  }

  volverATareas(): void {
    this.router.navigate(['/proyectos', this.proyectoId, 'tareas']);
  }
}
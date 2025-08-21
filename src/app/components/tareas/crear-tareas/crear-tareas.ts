import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../servicios/api/api.service';
@Component({
  selector: 'app-crear-tareas',
  standalone: false,
  templateUrl: './crear-tareas.html',
  styleUrl: './crear-tareas.css'
})
export class CrearTareas implements OnInit {
  proyectoId!: number;
  isLoading = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.proyectoId = +this.route.snapshot.parent?.paramMap.get('id')!;
  }

  onGuardarTarea(tareaData: any): void {
    this.isLoading = true;
    console.log('Datos de la tarea a crear:', tareaData);
    
    this.apiService.crearTarea(tareaData).subscribe({
      next: (tareaCreada) => {
        console.log('Tarea creada exitosamente:', tareaCreada);
        this.snackBar.open('Tarea creada correctamente', 'Cerrar', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.volverATareas();
      },
      error: (error) => {
        console.error('Error creando tarea:', error);
        this.snackBar.open('Error al crear la tarea', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
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

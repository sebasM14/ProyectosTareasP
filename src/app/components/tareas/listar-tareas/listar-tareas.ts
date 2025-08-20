import { Component, OnInit } from '@angular/core';
import { Tareas } from '../../../models/tareas';
import { ApiService } from '../../../servicios/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmacionModal } from '../../confirmacion-modal/confirmacion-modal/confirmacion-modal';

@Component({
  selector: 'app-listar-tareas',
  standalone: false,
  templateUrl: './listar-tareas.html',
  styleUrl: './listar-tareas.css'
})
export class ListarTareas implements OnInit {
  tareas: Tareas[] = [];
  tareasFiltradas: Tareas[] = [];
  isLoading = true;
  searchTerm = '';
  proyectoId!: number;
  proyectoNombre: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.proyectoId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.isLoading = true;
    this.apiService.obtenerTareasPorProyecto(this.proyectoId).subscribe({
      next: (tareas) => {
        this.tareas = tareas;
        this.tareasFiltradas = tareas;
        this.isLoading = false;
        
        if (tareas.length > 0) {
          this.proyectoNombre = `Proyecto ${this.proyectoId}`;
        }
      },
      error: (error) => {
        console.error('Error cargando tareas:', error);
        this.snackBar.open('Error al cargar las tareas', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  filtrarTareas(): void {
    if (!this.searchTerm) {
      this.tareasFiltradas = this.tareas;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.tareasFiltradas = this.tareas.filter(tarea =>
      tarea.title.toLowerCase().includes(term) ||
      (tarea.completed ? 'completada' : 'pendiente').includes(term)
    );
  }

  crearTarea(): void {
    this.router.navigate(['crear'], { relativeTo: this.route });
  }

  editarTarea(tareaId: number): void {
    this.router.navigate(['editar', tareaId], { relativeTo: this.route });
  }

  eliminarTarea(tareaId: number, tituloTarea: string): void {
    const dialogRef = this.dialog.open(ConfirmacionModal, {
      width: '400px',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: `¿Estás seguro de que quieres eliminar la tarea "${tituloTarea}"?`,
        textoConfirmar: 'Eliminar',
        textoCancelar: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.eliminarTarea(tareaId).subscribe({
          next: () => {
            this.snackBar.open('Tarea eliminada correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.cargarTareas();
          },
          error: (error) => {
            console.error('Error eliminando tarea:', error);
            this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  toggleCompletada(tarea: Tareas): void {
    const tareaActualizada = { ...tarea, completed: !tarea.completed };
    
    this.apiService.actualizarTarea(tarea.id, tareaActualizada).subscribe({
      next: (tareaActualizada) => {
        const mensaje = tareaActualizada.completed 
          ? 'Tarea marcada como completada' 
          : 'Tarea marcada como pendiente';
        
        this.snackBar.open(mensaje, 'Cerrar', {
          duration: 2000,
          panelClass: ['success-snackbar']
        });
        
        this.cargarTareas();
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

  volverAProyectos(): void {
    this.router.navigate(['/proyectos']);
  }

  trackByTareaId(index: number, tarea: Tareas): number {
    return tarea.id;
  }


}

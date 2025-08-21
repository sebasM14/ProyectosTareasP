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
  styleUrls: ['./listar-tareas.css']
})
export class ListarTareas implements OnInit {
  tareas: Tareas[] = [];
  tareasFiltradas: Tareas[] = [];
  paginatedTareas: Tareas[] = [];

  isLoading = true;
  searchTerm = '';
  proyectoId!: number;
  proyectoNombre: string = '';

  // 🔹 Paginación
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

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
      next: (tareasApi) => {
        const tareasMock = this.apiService.getTareasMock();
        const tareasFiltradasMock = tareasMock.filter(t => t.userId === this.proyectoId);
        
        this.tareas = [...tareasApi, ...tareasFiltradasMock];
        this.tareasFiltradas = this.tareas;
        this.actualizarPaginacion();
        this.isLoading = false;

        if (this.tareas.length > 0) {
          this.proyectoNombre = `Proyecto ${this.proyectoId}`;
        }
      },
      error: (error) => {
        console.error('Error cargando tareas API:', error);
        const tareasMock = this.apiService.getTareasMock();
        const tareasFiltradasMock = tareasMock.filter(t => t.userId === this.proyectoId);

        this.tareas = tareasFiltradasMock;
        this.tareasFiltradas = this.tareas;
        this.actualizarPaginacion();
        this.isLoading = false;

        this.snackBar.open('Cargando tareas locales', 'Cerrar', { duration: 3000 });
      }
    });
  }


  filtrarTareas(): void {
    if (!this.searchTerm) {
      this.tareasFiltradas = this.tareas;
    } else {
      const term = this.searchTerm.toLowerCase();
      this.tareasFiltradas = this.tareas.filter(tarea =>
        tarea.id.toString().includes(term) ||
        (tarea.title && tarea.title.toLowerCase().includes(term)) ||
        (tarea.completed ? 'completada' : 'pendiente').includes(term)
      );
    }
    this.currentPage = 1;
    this.actualizarPaginacion();
  }


  actualizarPaginacion(): void {
    this.totalPages = Math.ceil(this.tareasFiltradas.length / this.pageSize) || 1;
    this.paginatedTareas = this.tareasFiltradas.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  cambiarPagina(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.actualizarPaginacion();
    }
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
            this.snackBar.open('Tarea eliminada correctamente', 'Cerrar', { duration: 3000, panelClass: ['success-snackbar'] });
            this.cargarTareas();
          },
          error: (error) => {
            console.error('Error eliminando tarea:', error);
            this.snackBar.open('Error al eliminar la tarea', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
          }
        });
      }
    });
  }

  toggleCompletada(tarea: Tareas): void {
    const tareaActualizada = { ...tarea, completed: !tarea.completed };
    this.apiService.actualizarTarea(tarea.id, tareaActualizada).subscribe({
      next: (tareaActualizada) => {
        const mensaje = tareaActualizada.completed ? 'Tarea marcada como completada' : 'Tarea marcada como pendiente';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 2000, panelClass: ['success-snackbar'] });
        this.cargarTareas();
      },
      error: (error) => {
        console.error('Error actualizando tarea:', error);
        this.snackBar.open('Error al actualizar la tarea', 'Cerrar', { duration: 3000, panelClass: ['error-snackbar'] });
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

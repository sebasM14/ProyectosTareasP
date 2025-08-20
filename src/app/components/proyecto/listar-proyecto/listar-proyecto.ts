import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../servicios/api/api.service';
import { Proyectos } from '../../../models/proyectos';
import { ConfirmacionModal } from '../../confirmacion-modal/confirmacion-modal/confirmacion-modal';

@Component({
  selector: 'app-listar-proyecto',
  standalone: false,
  templateUrl: './listar-proyecto.html',
  styleUrl: './listar-proyecto.css'
})
export class ListarProyecto implements OnInit {
  proyectos: Proyectos[] = [];
  proyectosFiltrados: Proyectos[] = [];
  isLoading = true;
  searchTerm = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos(): void {
    this.isLoading = true;
    this.apiService.obtenerProyectos().subscribe({
      next: (proyectos) => {
        this.proyectos = proyectos;
        this.proyectosFiltrados = proyectos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando proyectos:', error);
        this.snackBar.open('Error al cargar los proyectos', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
        this.isLoading = false;
      }
    });
  }

  filtrarProyectos(): void {
    if (!this.searchTerm) {
      this.proyectosFiltrados = this.proyectos;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.proyectosFiltrados = this.proyectos.filter(proyecto =>
      proyecto.username.toLowerCase().includes(term) ||
      proyecto.name.toLowerCase().includes(term) ||
      proyecto.email.toLowerCase().includes(term) ||
      proyecto.city.toLowerCase().includes(term)
    );
  }

  verTareas(proyectoId: number): void {
    this.router.navigate(['/proyectos', proyectoId, 'tareas']);
  }

  editarProyecto(proyectoId: number): void {
    this.router.navigate(['/proyectos/editar', proyectoId]);
  }

  crearProyecto(): void {
    this.router.navigate(['/proyectos/crear']);
  }

  eliminarProyecto(proyectoId: number, proyectoNombre: string): void {
    const dialogRef = this.dialog.open(ConfirmacionModal, {
      width: '400px',
      data: {
        titulo: 'Confirmar eliminación',
        mensaje: `¿Estás seguro de que quieres eliminar el proyecto "${proyectoNombre}"? Esta acción no se puede deshacer.`,
        textoConfirmar: 'Eliminar',
        textoCancelar: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.eliminarProyecto(proyectoId).subscribe({
          next: () => {
            this.snackBar.open('Proyecto eliminado correctamente', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.cargarProyectos(); // Recargar la lista
          },
          error: (error) => {
            console.error('Error eliminando proyecto:', error);
            this.snackBar.open('Error al eliminar el proyecto', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        });
      }
    });
  }

  trackByProyectoId(index: number, proyecto: Proyectos): number {
    return proyecto.id;
  }

  // Método para obtener la dirección completa
  obtenerDireccionCompleta(proyecto: Proyectos): string {
    return `${proyecto.street}, ${proyecto.suite}, ${proyecto.city}, ${proyecto.zipcode}`;
  }

  // Método para obtener las coordenadas
  obtenerCoordenadas(proyecto: Proyectos): string {
    return `Lat: ${proyecto.lat}, Lng: ${proyecto.lng}`;
  }
}
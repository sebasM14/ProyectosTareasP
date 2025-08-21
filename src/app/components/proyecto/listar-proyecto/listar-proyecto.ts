import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../../servicios/api/api.service';
import { Proyectos } from '../../../models/proyectos';
import { ConfirmacionModal } from '../../confirmacion-modal/confirmacion-modal/confirmacion-modal';

@Component({
  selector: 'app-listar-proyecto',
  standalone: false,
  templateUrl: './listar-proyecto.html',
  styleUrls: ['./listar-proyecto.css']
})
export class ListarProyecto implements OnInit {
  displayedColumns: string[] = [
   'id',
  'name',
  'username',
  'email',
  'city',
  'direccion',
  'coordenadas',
  'phone',
  'website',
  'company',
  'acciones'
  ];

  dataSource = new MatTableDataSource<Proyectos>([]);
  isLoading = true;
  searchTerm = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  cargarProyectos(): void {
    this.isLoading = true;
    this.apiService.obtenerProyectos().subscribe({
      next: (proyectosApi) => {
        const proyectosMock = this.apiService.getProyectosMock();
        const proyectos = [...proyectosApi, ...proyectosMock];
        this.dataSource.data = proyectos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando proyectos API:', error);
        this.dataSource.data = this.apiService.getProyectosMock();
        this.isLoading = false;

        this.snackBar.open('Cargando proyectos locales', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
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
            this.cargarProyectos();
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

  obtenerDireccionCompleta(proyecto: Proyectos): string {
    return `${proyecto.address.street}, ${proyecto.address.suite}, ${proyecto.address.city}, ${proyecto.address.zipcode}`;
  }

  obtenerCoordenadas(proyecto: Proyectos): string {
    return `Lat: ${proyecto.address.geo.lat}, Lng: ${proyecto.address.geo.lng}`;
  }
}
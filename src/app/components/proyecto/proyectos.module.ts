import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table'; 
import { MatPaginatorModule } from '@angular/material/paginator'; 

import { ListarProyecto } from './listar-proyecto/listar-proyecto';
import { CrearProyecto } from './crear-proyecto/crear-proyecto';
import { ActualizarProyecto } from './actualizar-proyecto/actualizar-proyecto';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormularioProyecto } from './formulario-proyecto/formulario-proyecto';

const routes: Routes = [
  { path: '', component: ListarProyecto },
  { path: 'crear', component: CrearProyecto }, 
  { path: 'editar/:id', component: ActualizarProyecto }
];

@NgModule({
  declarations: [
    ListarProyecto,
    CrearProyecto, 
    ActualizarProyecto, FormularioProyecto
  ],
  imports: [
    CommonModule,
    HttpClientModule, 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    NgxPaginationModule,
    
    // Angular Material Modules
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule, 
    MatPaginatorModule 
  ]
})
export class ProyectosModule { }
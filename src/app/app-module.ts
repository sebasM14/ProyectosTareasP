import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Cabecera } from './components/contenedor/cabecera/cabecera';
import { Inicio } from './components/contenedor/inicio/inicio';
import { Error } from './components/contenedor/error/error';
import { Contacto } from './components/contenedor/contacto/contacto';
import { AcercaDe } from './components/contenedor/acerca-de/acerca-de';
import { Login } from './components/logueo/login/login';


import {BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {ToastrModule} from "ngx-toastr";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListarProyecto } from './components/proyecto/listar-proyecto/listar-proyecto';
import { CrearProyecto } from './components/proyecto/crear-proyecto/crear-proyecto';
import { AdministrarProyecto } from './components/proyecto/administrar-proyecto/administrar-proyecto';
import { ActualizarProyecto } from './components/proyecto/actualizar-proyecto/actualizar-proyecto';
import { ListarTareas } from './components/tareas/listar-tareas/listar-tareas';
import { CrearTareas } from './components/tareas/crear-tareas/crear-tareas';
import { AdministrarTareas } from './components/tareas/administrar-tareas/administrar-tareas';
import { ActualizarTareas } from './components/tareas/actualizar-tareas/actualizar-tareas';
import { ConfirmacionModal } from './components/confirmacion-modal/confirmacion-modal/confirmacion-modal';

// Importa los módulos de Angular Material necesarios
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    App,
    Cabecera,
    Inicio,
    Error,
    Contacto,
    AcercaDe,
    Login,
    ListarProyecto,
    CrearProyecto,
    AdministrarProyecto,
    ActualizarProyecto,
    ListarTareas,
    CrearTareas,
    AdministrarTareas,
    ActualizarTareas,
    ConfirmacionModal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

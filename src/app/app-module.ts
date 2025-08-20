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
@NgModule({
  declarations: [
    App,
    Cabecera,
    Inicio,
    Error,
    Contacto,
    AcercaDe,
    Login
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     ModalModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

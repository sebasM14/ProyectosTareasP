import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './components/contenedor/inicio/inicio';
import { Contacto } from './components/contenedor/contacto/contacto';
import { AcercaDe } from './components/contenedor/acerca-de/acerca-de';

const routes: Routes = [
    {path: "home", component: Inicio},
  {path: "contact", component: Contacto},
  {path: "aboutMe", component: AcercaDe},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

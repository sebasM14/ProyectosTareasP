import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './components/contenedor/inicio/inicio';
import { Contacto } from './components/contenedor/contacto/contacto';
import { AcercaDe } from './components/contenedor/acerca-de/acerca-de';
import { Login } from './components/logueo/login/login';
import { AuthGuard } from './guardian/auth-guard';
import { Cabecera } from './components/contenedor/cabecera/cabecera';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir a login por defecto
  { path: 'login', component: Login },
  
  // Rutas protegidas
  { 
    path: 'home', 
    component: Inicio ,
    canActivate: [AuthGuard] 
  },
 


  { 
    path: 'contact', 
    component: Contacto,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'aboutMe', 
    component: AcercaDe,
    canActivate: [AuthGuard] 
  },

  /********* RUTAS DE PROYECTOS ********** */
  {
    path: 'proyectos',
    loadChildren: () =>
      import('./components/proyecto/proyectos.module').then(
        (m) => m.ProyectosModule
      ),
    canActivate: [AuthGuard],
  },

  /********* RUTAS DE TAREAS ********** */
  {
    path: 'proyectos/:id/tareas',
    loadChildren: () =>
      import('./components/tareas/tareas.module').then(
        (m) => m.TareasModule
      ),
    canActivate: [AuthGuard],
  },


  /********* RUTA POR DEFECTO (404) ********** */
  { path: '**', redirectTo: '/login' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Inicio } from './components/contenedor/inicio/inicio';
import { Contacto } from './components/contenedor/contacto/contacto';
import { AcercaDe } from './components/contenedor/acerca-de/acerca-de';
import { Login } from './components/logueo/login/login';
import { AuthGuard } from './guardian/auth-guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Inicio },
  { path: 'contact', component: Contacto },
  { path: 'aboutMe', component: AcercaDe },
  { path: 'login', component: Login },

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
 

  /********* RUTA POR DEFECTO (404) ********** */
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Proyectos } from '../../models/proyectos';
import { ListarProyecto } from './listar-proyecto/listar-proyecto';
import { CrearProyecto } from './crear-proyecto/crear-proyecto';


const routes: Routes = [
  {
    path: '',
    component: Proyectos, // Contenedor con cabecera
    children: [
      { path: '', component: ListarProyecto },
      { path: 'crear', component: CrearProyecto },
      // otras rutas de proyectos
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule {}

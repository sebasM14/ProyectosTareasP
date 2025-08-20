import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-proyecto',
  standalone: false,
  templateUrl: './listar-proyecto.html',
  styleUrl: './listar-proyecto.css'
})
export class ListarProyecto  implements OnInit {
 

  constructor(
    private router :Router,
 private dialog: MatDialog
  ) 
  {

   }

  ngOnInit(): void {

  }

  cargarProyectos():void{
    
  }
 

}

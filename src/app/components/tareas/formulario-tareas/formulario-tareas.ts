import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tareas } from '../../../models/tareas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tareas',
  standalone: false,
  templateUrl: './formulario-tareas.html',
  styleUrl: './formulario-tareas.css',
})
export class FormularioTareas implements OnInit {


  @Input() tarea?: Tareas;
  @Input() proyectoId!: number;
  @Input() modoEdicion: boolean = false;
  @Output() guardar = new EventEmitter<Partial<Tareas>>();
  @Output() cancelar = new EventEmitter<void>();

  tareaForm: FormGroup;

  

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      completed: [false],
    });
  }

  ngOnInit(): void {
    if (this.tarea) {
      this.tareaForm.patchValue(this.tarea);
    }
  }

  onSubmit(): void {
    if (this.tareaForm.valid) {
      const tareaData = {
        ...this.tareaForm.value,
        userId: this.proyectoId,
      };
      this.guardar.emit(tareaData);
    } else {
      this.marcarControlesComoTocados();
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  private marcarControlesComoTocados(): void {
    Object.keys(this.tareaForm.controls).forEach((key) => {
      const control = this.tareaForm.get(key);
      control?.markAsTouched();
    });
  }

  get titulo(): string {
    return this.modoEdicion ? 'Editar Tarea' : 'Crear Tarea';
  }

  get title() {
    return this.tareaForm.get('title');
  }


  trackByTareaId(index: number, tarea: Tareas): number {
    return tarea.id;
  }
}

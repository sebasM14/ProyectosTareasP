import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyectos } from '../../../models/proyectos';

@Component({
  selector: 'app-formulario-proyecto',
  standalone: false,
  templateUrl: './formulario-proyecto.html',
  styleUrl: './formulario-proyecto.css'
})
export class FormularioProyecto implements OnInit {
  @Input() proyecto?: Proyectos;
  @Input() modoEdicion: boolean = false;
  @Output() guardar = new EventEmitter<Partial<Proyectos>>();
  @Output() cancelar = new EventEmitter<void>();
  
  proyectoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.proyectoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      website: [''],
      address: this.fb.group({
        street: [''],
        suite: [''],
        city: [''],
        zipcode: [''],
        geo: this.fb.group({
          lat: [''],
          lng: ['']
        })
      }),
      company: this.fb.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  ngOnInit(): void {
    if (this.proyecto) {
      this.proyectoForm.patchValue({
        ...this.proyecto,
        address: this.proyecto.address,
        company: this.proyecto.company
      });
    }
  }

  onSubmit(): void {
    console.log('Formulario válido:', this.proyectoForm.valid);
    console.log('Datos del formulario:', this.proyectoForm.value);
    
    if (this.proyectoForm.valid) {
      this.guardar.emit(this.proyectoForm.value);
    } else {
      console.log('Formulario inválido, mostrando errores');
      this.marcarControlesComoTocados();
    }
  }

  onCancel(): void {
    this.cancelar.emit();
  }

  private marcarControlesComoTocados(): void {
    Object.keys(this.proyectoForm.controls).forEach(key => {
      const control = this.proyectoForm.get(key);
      control?.markAsTouched();
    });
  }

  get titulo(): string {
    return this.modoEdicion ? 'Editar Proyecto' : 'Crear Proyecto';
  }

  // validación en el template
  get nombre() { return this.proyectoForm.get('name'); }
  get username() { return this.proyectoForm.get('username'); }
  get email() { return this.proyectoForm.get('email'); }
}
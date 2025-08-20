import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmacionModalData {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  colorConfirmar?: 'primary' | 'accent' | 'warn';
  mostrarIcono?: boolean;
  icono?: string;
  colorIcono?: string;
}

@Component({
  selector: 'app-confirmacion-modal',
  standalone: false,
  templateUrl: './confirmacion-modal.html',
  styleUrl: './confirmacion-modal.css'
})
export class ConfirmacionModal {
  constructor(
    public dialogRef: MatDialogRef<ConfirmacionModal>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmacionModalData
  ) {
    // Establecer valores por defecto
    this.data.textoConfirmar = this.data.textoConfirmar || 'Confirmar';
    this.data.textoCancelar = this.data.textoCancelar || 'Cancelar';
    this.data.colorConfirmar = this.data.colorConfirmar || 'warn';
    this.data.mostrarIcono = this.data.mostrarIcono ?? true;
    this.data.icono = this.data.icono || 'warning';
    this.data.colorIcono = this.data.colorIcono || '#f44336';
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
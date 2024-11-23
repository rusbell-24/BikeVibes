import { Component, Inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-define-points-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './define-points-modal.component.html',
  styleUrl: './define-points-modal.component.css'
})
export class DefinePointsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DefinePointsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos dinámicos
  ) {}

  save(): void {
    // Lógica para guardar los datos ingresados
    console.log('Datos del formulario:', this.data.fields);
    this.dialogRef.close(this.data.fields); // Envía los datos al cerrar
}

}

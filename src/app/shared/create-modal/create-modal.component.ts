import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-create-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './create-modal.component.html',
  styleUrl: './create-modal.component.css'
})
export class CreateModalComponent {
  

  constructor(private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<CreateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos dinámicos
  ) {}

  ngOnInit() {
    // Fuerza la detección de cambios después de que se ha configurado la data
    this.cdr.detectChanges();
  }
  closeModal() {
    this.dialogRef.close(this.data.fields);  // Aquí se pasan los datos al cerrar el modal
  }

  save(): void {
      // Lógica para guardar los datos ingresados
      this.dialogRef.close(this.data.fields); // Envía los datos al cerrar
  }
}

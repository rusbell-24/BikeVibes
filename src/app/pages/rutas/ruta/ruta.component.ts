import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';
import { DinamicTableComponent } from '../../../shared/dinamic-table/dinamic-table.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../shared/create-modal/create-modal.component';

@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, NavigationComponent, DinamicTableComponent ],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent {
  constructor(private dialog: MatDialog) {}
  
  rutas = [
    { name: 'Ruta san pedro' },
    { name: 'Ruta parque simon' },
    { name: 'Ruta caldas' }
  ];


    openCreateRouteModal(): void {
      this.dialog.open(CreateModalComponent, {
        width: '500px',
        data: {
            title: 'Nueva Ruta',
            fields: [
                { name: 'title', label: 'Nombre de la Ruta', type: 'text', value: '' },
                { name: 'startPoint', label: 'Punto inicio de referencia', type: 'text', value: '' },
                { name: 'endPoint', label: 'Punto fin referencia', type: 'text', value: '' },
            ],
        },
    }).afterClosed().subscribe(result => {
        if (result) {
            console.log('Datos guardados:', result);
            // Maneja los datos enviados desde el modal
        }
    });
    }

}

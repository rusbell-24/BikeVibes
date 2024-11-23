import { Component } from '@angular/core';
import { DinamicTableComponent } from '../../../shared/dinamic-table/dinamic-table.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../shared/create-modal/create-modal.component';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DinamicTableComponent, HeaderComponent, NavigationComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  constructor(private dialog: MatDialog) {}

  eventos = [
    { name: 'Evento 1' },
    { name: 'Evento 2' },
    { name: 'Evento 3' }
  ];

  openCreateEventModal(): void {
    this.dialog.open(CreateModalComponent, {
      width: '500px',
      data: {
          title: 'Nuevo Evento',
          fields: [
              { name: 'title', label: 'Nombre del evento', type: 'text', value: '' },
              { name: 'detail', label: 'Descripcion del evento', type: 'text', value: '' },
              { name: 'location', label: 'Ubicacion inicial del evento', type: 'text', value: '' },
              { name: 'price', label: 'Premio', type: 'text', value: '' },
              { name: 'awarding', label: 'Incluye premiación', type: 'checkbox', value: '' },
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

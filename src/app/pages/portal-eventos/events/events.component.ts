import { Component } from '@angular/core';
import { DinamicTableComponent } from '../../../shared/dinamic-table/dinamic-table.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [DinamicTableComponent, HeaderComponent, NavigationComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  eventos = [
    { name: 'Evento 1' },
    { name: 'Evento 2' },
    { name: 'Evento 3' }
  ];
}

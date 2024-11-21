import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';
import { DinamicTableComponent } from '../../../shared/dinamic-table/dinamic-table.component';

@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, NavigationComponent, DinamicTableComponent ],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent {
  rutas = [
    { name: 'Ruta san pedro' },
    { name: 'Ruta parque simon' },
    { name: 'Ruta caldas' }
  ];

}

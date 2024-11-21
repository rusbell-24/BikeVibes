import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../../shared/header/header.component';
import {NavigationComponent} from '../../../shared/navigation/navigation.component';

@Component({
  selector: 'app-ruta',
  standalone: true,
  imports: [CommonModule, MatIconModule, HeaderComponent, NavigationComponent ],
  templateUrl: './ruta.component.html',
  styleUrl: './ruta.component.css'
})
export class RutaComponent {
  rutas = [
    { nombre: 'Ruta san pedro' },
    { nombre: 'Ruta parque simon' },
    { nombre: 'Ruta caldas' }
  ];

}

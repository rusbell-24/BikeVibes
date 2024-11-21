import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dinamic-table',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './dinamic-table.component.html',
  styleUrl: './dinamic-table.component.css'
})
export class DinamicTableComponent {
  @Input() sectionTitle: string = '';
  @Input() elements: any[] = [];
  @Input() img: string = '';
}

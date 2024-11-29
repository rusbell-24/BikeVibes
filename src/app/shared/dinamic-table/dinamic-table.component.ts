import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { DataTransferService } from '../../core/services/route/data-transfer.service';

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
  @Input() routeToNavegate: string ='';
  @Output() deleteElement = new EventEmitter<Route>();

  constructor(private router: Router, private dataTransferService: DataTransferService) {}


  onDelete(element: any): void {
    this.deleteElement.emit(element);  // Emite el evento con el elemento a eliminar
  }

  goToRoute(element: any): void {
    this.dataTransferService.setData(element);
    this.router.navigate([this.routeToNavegate]);
  }
}

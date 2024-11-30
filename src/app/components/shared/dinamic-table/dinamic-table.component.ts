import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Route, Router } from '@angular/router';
import { DataTransferService } from '../../../core/services/route/data-transfer.service';
import { UserService } from '../../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../../core/services/permissions/permissions-for-features.service';

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

  public sessionInfo: any;
  public data: any;
  public showDeleteEventfeature: boolean = false;
  public showDeleteRoutefeature: boolean = false;

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService,
    private userService: UserService,
    private permissionService: PermissionsForFeaturesService, 
    ) {}

  ngOnInit():void {
    this.sessionInfo = this.userService.isSessionActive();

    
    if (this.sessionInfo) {
      
      this.permissionService.setUserType(this.sessionInfo.user.userType);
      // Verificar permiso con el servicio
      this.showDeleteEventfeature = this.permissionService.canAccessFeature('deleteEventFeature');
    }
  }
  
  
  onDelete(element: any): void {
    this.deleteElement.emit(element);
    // Emite el evento con el elemento a eliminar
  }

  goToElement(element: any): void {
    this.dataTransferService.setData(element);
    this.router.navigate([this.routeToNavegate]);
  }
}

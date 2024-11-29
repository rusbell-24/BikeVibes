import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { UserService } from '../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../core/services/permissions/permissions-for-features.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cuenta',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent {

  isActive: boolean = false;

  public data: any;
  public showPrivacyFeature: boolean = false;
  public routesCounter: number = 0;
  public eventsCounter: number = 0;

  constructor(
    private userService: UserService,
    private permissionService : PermissionsForFeaturesService,
  ){}

  ngOnInit(): void {

    const sessionInfo = this.userService.isSessionActive();

    
    if (sessionInfo) {
      this.data = sessionInfo.user
      console.log(this.data);
      this.permissionService.setUserType(sessionInfo.user.userType);
      
      // Verificar permiso con el servicio
      this.showPrivacyFeature = this.permissionService.canAccessFeature('customizationProfileFeature');

      this.handlerStatistics(sessionInfo);

    }
  }

  handlerStatistics(data: any){
    this.routesCounter = (JSON.parse(data.routes)).length;
    this.eventsCounter = (JSON.parse(data.events)).length;
  }

  toggleState() {
    console.log("toggle state")
    this.userService.updatePrivacy(this.data.id).subscribe((data: any) => {
      this.data = data.body;
    });
    
    
    this.isActive = !this.isActive;

  }
}

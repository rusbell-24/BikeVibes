import { Component, Input, OnInit } from '@angular/core';
import { BtnEventFeatureComponent } from "../../features/btn-event-feature/btn-event-feature.component";
import { BtnRoutesFeatureComponent } from "../../features/btn-routes-feature/btn-routes-feature.component";
import { UserService } from '../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../core/services/permissions/permissions-for-features.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [BtnEventFeatureComponent, BtnRoutesFeatureComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Input() userType: string = "";
  public showfeature: boolean = false;


  constructor(
    private userService: UserService,
    private permissionService: PermissionsForFeaturesService
  ){}

  ngOnInit(): void{
    const sessionInfo = this.userService.isSessionActive();

    if (sessionInfo) {
      this.permissionService.setUserType(sessionInfo.user.userType);
      // Verificar permiso con el servicio
      this.showfeature = this.permissionService.canAccessFeature('eventPortalFeature');
      console.log(this.showfeature)
    }
  }
}

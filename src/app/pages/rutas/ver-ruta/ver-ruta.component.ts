import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { Router } from '@angular/router';
import { DataTransferService } from '../../../core/services/route/data-transfer.service';
import { UserService } from '../../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../../core/services/permissions/permissions-for-features.service';

@Component({
  selector: 'app-ver-ruta',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './ver-ruta.component.html',
  styleUrl: './ver-ruta.component.css'
})
export class VerRutaComponent {



  data: any;
  public showsharedRoutefeature: boolean = false;

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService,
    private userService: UserService,
    private permissionService: PermissionsForFeaturesService,) {}
    

  ngOnInit(): void {

    const sessionInfo = this.userService.isSessionActive();

    
    if (sessionInfo) {

      this.data = this.dataTransferService.getData();
      console.log('ruta recibida: ', this.data);
      
      this.permissionService.setUserType(sessionInfo.user.userType);
      // Verificar permiso con el servicio
      this.showsharedRoutefeature = this.permissionService.canAccessFeature('sharedRouteFeature');
      console.log(this.showsharedRoutefeature)
    }


  }
}

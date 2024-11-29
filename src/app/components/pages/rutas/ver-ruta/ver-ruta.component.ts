import { Component } from '@angular/core';
import { HeaderComponent } from "../../../../components/shared/header/header.component";
import { Router } from '@angular/router';
import { DataTransferService } from '../../../../core/services/route/data-transfer.service';
import { UserService } from '../../../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../../../core/services/permissions/permissions-for-features.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateModalComponent } from '../../../shared/create-modal/create-modal.component';

@Component({
  selector: 'app-ver-ruta',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './ver-ruta.component.html',
  styleUrl: './ver-ruta.component.css'
})
export class VerRutaComponent {



  data: any;
  public showShareRoutefeature: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataTransferService: DataTransferService,
    private userService: UserService,
    private permissionService: PermissionsForFeaturesService,) {}
    

  ngOnInit(): void {

    const sessionInfo = this.userService.isSessionActive();

    
    if (sessionInfo) {

      this.data = this.dataTransferService.getData();
      this.permissionService.setUserType(sessionInfo.user.userType);
      this.showShareRoutefeature = this.permissionService.canAccessFeature('sharedRouteFeature');
    }
  }

  openShareRouteModal(){
    const dialogRef = this.dialog.open(CreateModalComponent, {

      width: '500px',
      data: {
          title: 'Compartir ruta',
          fields: [
              { name: 'email', label: 'Email para envío', type: 'text', value: '' }],
      },
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      alert("Ruta compartida");
    }
  });
  }
}

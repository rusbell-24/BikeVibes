import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { Router } from '@angular/router';
import { DataTransferService } from '../../../../core/services/route/data-transfer.service';
import { UserService } from '../../../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../../../core/services/permissions/permissions-for-features.service';

@Component({
  selector: 'app-view-events',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './view-events.component.html',
  styleUrl: './view-events.component.css'
})
export class ViewEventsComponent {

  public data: any;

  constructor(
    private router: Router,
    private dataTransferService: DataTransferService,
    private userService: UserService,
    private permissionService: PermissionsForFeaturesService,) {}
    

  ngOnInit(): void {

    const sessionInfo = this.userService.isSessionActive();

    if (sessionInfo) {

      this.data = this.dataTransferService.getData();
      console.log('evento recibido: ', this.data);      
      this.permissionService.setUserType(sessionInfo.user.userType);
    }
  }

  handlerEventRegistration(){
    alert("Te registraste de manera exitosa al evento")
    this.router.navigate(['/eventos']);
  }

}

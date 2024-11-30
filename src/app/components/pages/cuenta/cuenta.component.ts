import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../../components/shared/header/header.component";
import { UserService } from '../../../core/services/user/user.service';
import { PermissionsForFeaturesService } from '../../../core/services/permissions/permissions-for-features.service';
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
      console.log(data)
    });

    const jsonRequest = {
      username: this.data.username,
      password: this.data.password,
    };

    this.userService.login(jsonRequest).subscribe(
      (response) => {
        console.log("responsel del user", response.body.privacyLevel)
        this.data = response.body;
      });
    
    this.isActive = !this.isActive;

  }
}

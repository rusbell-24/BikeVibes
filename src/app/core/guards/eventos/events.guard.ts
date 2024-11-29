import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { PermissionsForFeaturesService } from '../../services/permissions/permissions-for-features.service';

@Injectable({
  providedIn: 'root'
})

export class eventsGuard implements CanActivate {

  public showfeature: boolean = false;

  constructor(
    private userService: UserService,
     private router: Router,
     private permissionService: PermissionsForFeaturesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Usa el servicio para validar la lógica
    
    const sessionInfo = this.userService.isSessionActive();

    if (sessionInfo) {
      this.permissionService.setUserType(sessionInfo.user.userType);
      
      this.showfeature = this.permissionService.canAccessFeature('eventPortalFeature');
      if (this.showfeature) {
        return true;
      }
      else {
        window.alert('No tienes permiso para acceder a esta ruta.');
        window.location.href = '/login';
        return false;
      }
    } else {
      // Redirige si no está autenticado
      window.alert('No tienes permiso para acceder a esta ruta.');
      window.location.href = '/login';
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class routesGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Usa el servicio para validar la lógica
    if (this.userService.isSessionActive().isActive) {
      return true;
    } else {
      // Redirige si no está autenticado
      window.alert('No tienes permiso para acceder a esta ruta.');
    window.location.href = '/login';
    return false;
    }
  }
}

  

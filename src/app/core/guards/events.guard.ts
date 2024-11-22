import { CanActivateFn } from '@angular/router';

export const eventsGuard: CanActivateFn = (route, state) => {
  const userType = localStorage.getItem('userType') || 'velomaster'; //aqui consumir la informacion del usuario autenticado

  if (userType === 'velomaster') {
    return true; 
  } else {
    window.alert('No tienes permiso para acceder a esta ruta.');
    window.location.href = '/login';
    return false;
  }
};
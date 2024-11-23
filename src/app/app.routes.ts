import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { RutaComponent } from './pages/rutas/ruta/ruta.component';
import { routesGuard } from './core/guards/routes.guard';
import { EventsComponent } from './pages/portal-eventos/events/events.component';
import { eventsGuard } from './core/guards/events.guard';

export const routes: Routes = [
    
    { 
        path: '',
        redirectTo: '/login',
         pathMatch: 'full' 
    },
    { 
        path: 'login',
        component: LoginComponent
    },
    { 
        path: 'register',
        component: RegisterComponent 
    },
    { path: 'rutas', component: RutaComponent, canActivate: [routesGuard] },
    { path: 'eventos', component: EventsComponent, canActivate: [eventsGuard] },
];

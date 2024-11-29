import { Routes } from '@angular/router';

import { routesGuard } from './core/guards/rutas/routes.guard';
import { eventsGuard } from './core/guards/eventos/events.guard';

import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { RutaComponent } from './components/pages/rutas/ruta/ruta.component';
import { EventsComponent } from './components/pages/portal-eventos/events/events.component';
import { VerRutaComponent } from './components/pages/rutas/ver-ruta/ver-ruta.component';
import { ViewEventsComponent } from './components/pages/portal-eventos/view-events/view-events.component';
import { CuentaComponent } from './components/pages/cuenta/cuenta.component';
import { accountGuard } from './core/guards/cuenta/cuenta.guard';

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
    {
        path:'rutas',
        component:RutaComponent,
        canActivate: [routesGuard],  // Aquí aplicas el guard
    },
    {
        path:'ver-ruta',
        component:VerRutaComponent,
        canActivate: [routesGuard], 
    },{
        path:'eventos',
        component:EventsComponent,
        canActivate: [eventsGuard],  // Aquí también aplicas el guard
    },
    {
        path:'ver-evento',
        component:ViewEventsComponent,
        canActivate: [eventsGuard],  // Aquí también aplicas el guard
    },
    {
        path:'cuenta',
        component:CuentaComponent,
        canActivate: [accountGuard]  // Aquí también aplicas el guard
    }
];

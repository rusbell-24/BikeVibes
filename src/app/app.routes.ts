import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { RutaComponent } from './pages/rutas/ruta/ruta.component';
import { routesGuard } from './core/guards/rutas/routes.guard';
import { EventsComponent } from './pages/portal-eventos/events/events.component';
import { eventsGuard } from './core/guards/eventos/events.guard';
import { VerRutaComponent } from './pages/rutas/ver-ruta/ver-ruta.component';
import { ViewEventsComponent } from './pages/portal-eventos/view-events/view-events.component';
import { CuentaComponent } from './pages/cuenta/cuenta.component';

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
        component:CuentaComponent,  // Aquí también aplicas el guard
    }
];

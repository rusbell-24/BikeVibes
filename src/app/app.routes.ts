import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { RutaComponent } from './pages/rutas/ruta/ruta.component';
import { routesGuard } from './guards/routes.guard';

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
    // { 
    //     path: 'rutas',
    //     component: RutaComponent 
    // },
    { path: 'rutas', component: RutaComponent, canActivate: [routesGuard] },
];

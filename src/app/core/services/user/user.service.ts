import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { BehaviorSubject, Observable, throwError} from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { PermissionsForFeaturesService } from '../permissions/permissions-for-features.service';
import { routes } from '../../../app.routes';
import { RouteService } from '../route/route-service.service';
import { Route } from '../../../models/route';
import { Event } from '../../../models/event';
import { EventService } from '../event/event-service.service';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  modelRoute: Route = {userId:"",title:"",startPoint:"", endPoint: ""};
  routes: any[] = [];
  modelEvent: Event = {userId:"",title:"",detail:"", location: "", price:"", awarding: false};
  events: any[] = [];

  
  private privacySubject = new BehaviorSubject<any[]>([]);  // El estado actual de las rutas
  //userPrivacy$ = this.privacySubject.asObservable();

  constructor(
    private httpService: HttpService,
    private permissionService: PermissionsForFeaturesService,
    private routeService: RouteService,
    private eventService: EventService,
  ) {}

  createUser(jsonRequest: any): Observable<any> {
    console.log('user json', jsonRequest);
    return this.httpService.postJsonWithoutCredentials('user/create', jsonRequest).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error creating user', error);
        return throwError(error);
      })
    );
  }

  login(jsonRequest: any): Observable<any> {
    return this.httpService.postJson('user/validate', jsonRequest).pipe(
      map(response => {

        localStorage.setItem('user', JSON.stringify(response.body)); // Puedes usar sessionStorage si prefieres almacenar solo durante la sesión
        
        const sessionStatus = this.isSessionActive();
        if (sessionStatus) {
          this.permissionService.setUserType(sessionStatus.user.userType);
          this.setLocalStorage(response.body);
      
        }
          return response;
      }),
      catchError(error => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }

  updatePrivacy(userId: string): Observable<any> {
  
    return this.httpService.postJsonWithoutCredentials(`user/${userId}/update/privacy`,{}).pipe(
      map(response => {
        localStorage.setItem('user', JSON.stringify(response.body));
        return response
      }),  // Procesa la respuesta
      catchError(error => {
        return throwError(error);
      })
    );
  }



  setLocalStorage(user: any){

    forkJoin({
      routes: this.routeService.getRoutes(user.id),
      events: this.eventService.getEvents(user.id)
    }).subscribe({
      next: (results) => {
        this.routes = results.routes;
        this.events = results.events;
  
        // Guardar en localStorage
        localStorage.setItem('routes', JSON.stringify(this.routes));
        localStorage.setItem('events', JSON.stringify(this.events));
      },
      error: (err) => {
        console.error("Error al obtener datos", err);
      }
    });
  }

  isSessionActive(): { isActive: boolean; user: any | null; routes: any | null; events: any | null} {
    const user = localStorage.getItem('user');
    const routes = localStorage.getItem('routes');
    const events = localStorage.getItem('events');

    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        return { isActive: true, user: parsedUser, routes: routes, events: events}; // Retorna true y el usuario si todo está bien
      } catch (error) {
        console.error("Error al parsear el usuario desde localStorage:", error);
        return { isActive: false, user: null, routes: null, events: null}; // Retorna false si hay un error al parsear
      }
    }
    return { isActive: false, user: null, routes: null, events: null}; // Retorna false si no hay usuario en el Local Storage
  }

}


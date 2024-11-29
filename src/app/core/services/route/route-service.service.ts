import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError} from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private routesSubject = new BehaviorSubject<any[]>([]);  
  routes$ = this.routesSubject.asObservable();

  constructor(private httpService: HttpService) {}

  createRoute(jsonRequest: any): Observable<any> {
    console.log('Enviando datos al servidor:', jsonRequest);
    return this.httpService.postJsonWithoutCredentials('route/create', jsonRequest).pipe(
        map(response => response),
        catchError(error => {
            console.error('Error creando la ruta', error);
            return throwError(error);
        })
    );
  }


  // Se obtinen las rutas
  getRoutes(userId: string): Observable<any> {
    return this.httpService.getRequestWithoutParamAndCredentials(`route/search/user/${userId}`).pipe(
      map(response => response),
      tap(data => this.routesSubject.next(data)),
      catchError(error => throwError(error))
    );
  }

  deleteRoute(jsonRequest: any): Observable<any> {
    console.log('Enviando datos al servidor:', jsonRequest);
    return this.httpService.deleteWithoutCredentials('route/remove', jsonRequest).pipe(
        map(response => response),
        catchError(error => {
            console.error('Error eliminando el evento', error);
            return throwError(error);
        })
    );
  }

  
}
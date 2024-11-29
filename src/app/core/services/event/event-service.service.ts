import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventsSubject = new BehaviorSubject<any[]>([]);  // El estado actual de los eventos
  events$ = this.eventsSubject.asObservable();

  constructor(private httpService: HttpService) { }

  // servicio para crear un evento
  createEvent(jsonRequest: any): Observable<any> {
    console.log('Enviando datos al servidor:', jsonRequest);
    return this.httpService.postJsonWithoutCredentials('event/create', jsonRequest).pipe(
        map(response => response),
        catchError(error => {
            console.error('Error creando el evento', error);
            return throwError(error);
        })
    );
  }

  // Servicio para obtener los eventos
  getEvents(userId: string): Observable<any> {
    return this.httpService.getRequestWithoutParamAndCredentials(`event/search/user/${userId}`).pipe(
      map(response => response),
      tap(data => this.eventsSubject.next(data)),
      catchError(error => throwError(error))
    );
  }

  // Servicio para eliminar un evento
  deleteEvent(jsonRequest: any): Observable<any> {
    console.log('Enviando datos al servidor:', jsonRequest);
    return this.httpService.deleteWithoutCredentials('event/remove', jsonRequest).pipe(
        map(response => response),
        catchError(error => {
            console.error('Error eliminando el evento', error);
            return throwError(error);
        })
    );
  }
}

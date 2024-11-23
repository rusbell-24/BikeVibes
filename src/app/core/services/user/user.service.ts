import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpService: HttpService) {}

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
      map(response => response),
      catchError(error => {
        console.error('Login error', error);
        return throwError(error);
      })
    );
  }
}

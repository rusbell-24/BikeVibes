import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // URL base del backend
  readonly baseUrl = 'http://localhost:8080/';

  constructor(protected http: HttpClient) {}

  /**
   * Realiza un POST sin credenciales.
   */
  postJsonWithoutCredentials(url: string, data: any): Observable<HttpResponse<string>> {
    console.log('HTTP URL:', this.baseUrl + url);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.baseUrl}${url}`, data, {
      headers: httpHeaders,
      observe: 'response'
    });
  }


  /**
   * Realiza un POST con credenciales.
   */
  postJson(url: string, data: any): Observable<HttpResponse<string>> {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<string>(`${this.baseUrl}${url}`, data, {
      headers: httpHeaders,
      withCredentials: true,
      observe: 'response'
    });
  }

  /**
   * Realiza un GET con credenciales y parámetros.
   */
  getRequest(url: string, data: any): Observable<any> {
    const params = this.listParams(data);
    return this.http.get(`${this.baseUrl}${url}?${params}`, { withCredentials: true });
  }

  /**
   * Realiza un GET sin credenciales pero con parámetros.
   */
  getRequestWithoutCredentials(url: string, data: any): Observable<any> {
    const params = this.listParams(data);
    return this.http.get(`${this.baseUrl}${url}?${params}`);
  }

  /**
   * Realiza un GET con credenciales pero sin parámetros.
   */
  getRequestWithoutPar(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`, { withCredentials: true });
  }

  /**
   * Realiza un GET sin credenciales ni parámetros.
   */
  getRequestWithoutParamAndCredentials(url: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${url}`);
  }

  /**
   * Convierte un objeto de parámetros en una cadena de consulta.
   */
  private listParams(data: any): string {
    if (!data || Object.keys(data).length === 0) {
      return '';
    }

    return Object.keys(data)
      .map(key => `${key}=${encodeURIComponent(data[key])}`)
      .join('&');
  }


  /**
   * Realiza una solicitud DELETE sin credenciales.
   */
  deleteWithoutCredentials(url: string, data: any): Observable<HttpResponse<string>> {
    console.log('HTTP DELETE URL:', this.baseUrl + url);
  
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    const options = {
      headers: httpHeaders,
      body: data,  // Aquí es donde envías los datos en el cuerpo
      observe: 'response' as const  // Especificamos que queremos la respuesta completa (código de estado, etc.)
    };
  
    return this.http.delete<string>(`${this.baseUrl}${url}`, options);
  }

}
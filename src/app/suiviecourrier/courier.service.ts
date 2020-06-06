import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AbstractService } from '../config/abstract.service';
import { SERVER_URL } from '../app.constants';
import { Courrier } from '../models/courrier';
import { TypeCourrier } from '../models/typecourrier';
import { createRequestOption } from '../shared';




@Injectable()
export class CourierService {

  constructor(private http: HttpClient, private option: AbstractService   /* private option:AuthInterceptor */) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/courriers';
  private urlTypeCourrier = SERVER_URL + 'api/typecourriers';
  private urlResponse = SERVER_URL + 'api/courriers';



  pushFileToStorage(file: File, courrier:Courrier): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    formdata.append('courrier', courrier.toString());

    const req = new HttpRequest('POST', 'api/courriers', formdata, {
      reportProgress: true,
      headers: this.option.getOption().headers,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  public saveCourrier(courrier: Courrier): Observable<HttpResponse<Courrier>> {

    return this.http.post<Courrier>(this.url, courrier, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public getAllTypeCourrier<Response>() {
    console.log("my url fff " + this.urlTypeCourrier);
    return this.http.get<TypeCourrier[]>(this.urlTypeCourrier);
  }
  public getAllCourrier<Response>() {
    console.log(" all courriers " + this.url);
    return this.http.get<any[]>(this.url);
  }

  query(req?: any): Observable<HttpResponse<any[]>> {
    const options = createRequestOption(req);
    console.log('ici');
    return this.http.get<any[]>(this.url, { headers: this.option.getOption().headers, params: options, observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const x = 'Erreur *******';
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      return x;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong, 

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  public envoiCourrier(traitementCourrier: any): Observable<HttpResponse<any>> {

    return this.http.put<any>(this.url, traitementCourrier, { headers: this.option.getOption().headers, observe: 'response' });
  }

}

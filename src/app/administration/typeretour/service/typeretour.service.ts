import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';

import { SERVER_URL } from '../../../app.constants';
import {createRequestOption} from '../../../shared/model/request-util';
import { Fonction, Service } from '../../../models';
import { Employe } from '../../../models/employe';
import { Droit } from '../../../models/droit';
import { ResponseWrapper } from '../../../shared';
import { AbstractService } from '../../../config/abstract.service';
import { TypeRetour } from '../../../models/typeretour';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeRetourService {

  constructor(private http: HttpClient, private option: AbstractService) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/typeretours';
  private urltyperetour= SERVER_URL +'api/list';
  private urldelete=SERVER_URL+'api/typeretours';
  private urlTypeCourrier = SERVER_URL + 'api/typecourriers';

  
 /*  public getAllFonction<Response>() {

    return this.http.get<Fonction[]>(this.urlFonction);
  }
 */
 

 /*  public deleteEmploye(employe) {
    return this.http.delete(this.url + '/' + employe.id);
  }
 */
/* 
find(id: any): Observable<any> {
  return this.http.get(`${this.urlFonctionById}?id=${id}`, this.option.getOption())
.pipe(map((res) => res));
} */

public getAllTyperetour<Response>() {
    return this.http.get<TypeRetour[]>(this.urlTypeCourrier);
  }



  query(req?: any): Observable<HttpResponse<TypeRetour[]>> {
    const options = createRequestOption(req);
    console.log('ici');
    return this.http.get<TypeRetour[]>(this.url, {headers: this.option.getOption().headers, params: options, observe: 'response' });
}

 /*  public saveFonction(fonction:Fonction) : Observable<HttpResponse<Fonction>>{
console.log("my url    "+this.url);
    return this.http.post<Fonction>(this.url, fonction,{observe:'response'});
  } */

  public saveTyperetour(typeretour:TypeRetour) : Observable<HttpResponse<TypeRetour>>{

    console.log("my url "+this.url);
    return this.http.post<TypeRetour>(this.url, typeretour,{headers:this.option.getOption().headers ,observe:'response'});
  }

  public updateTyperetour(typeretour:TypeRetour) : Observable<HttpResponse<TypeRetour>>{

    console.log("my url "+this.url);
    return this.http.put<TypeRetour>(this.url, typeretour,{headers:this.option.getOption().headers ,observe:'response'});
  }
  onDelete(id: any) {
    return this.http.delete(this.urldelete+`/${id}`,{headers: this.option.getOption().headers, observe: 'response' });
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



  
}

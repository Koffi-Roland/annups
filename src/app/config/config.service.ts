/*
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,tap,map } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  constructor(private http: HttpClient, private httpError: HttpErrorResponse) { }




  private  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      const  x = 'Erreur de connection au serveur';
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
  };

/*   getTextFile(filename: string) {
    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(filename, {responseType: 'text'})
      .pipe(
        tap( // Log the result or error
          data => this.log(filename, data),
          error => this.logError(filename, error)
        )
      );
  } 


}

 */

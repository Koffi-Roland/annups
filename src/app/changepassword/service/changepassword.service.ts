import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { SERVER_URL } from '../../app.constants';
import { AbstractService } from '../../config/abstract.service';
import { ChangePassword } from '../../models/changepassword';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ChangePasswordService {

  constructor(private http: HttpClient, private option: AbstractService) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/account/change_password';
  public changePassword(pass:ChangePassword) : Observable<HttpResponse<ChangePassword>>{
    console.log("my url "+this.url);
    return this.http.post<ChangePassword>(this.url, pass,{headers:this.option.getOption().headers ,observe:'response'}) ;
    }


}

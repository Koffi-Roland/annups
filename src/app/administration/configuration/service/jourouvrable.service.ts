import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_URL } from '../../../app.constants';
import {createRequestOption} from '../../../shared/model/request-util';
import { Fonction, Service } from '../../../models';
import { Employe } from '../../../models/employe';
import { Droit } from '../../../models/droit';
import { ResponseWrapper } from '../../../shared';
import { AuthInterceptor } from '../../../blocks/interceptor/auth.interceptor';
import { employeState } from '../../../employe';
import { AbstractService } from '../../../config/abstract.service';
import { EmployeTempo } from '../../../models/employetempo';
import { Jour } from '../../../models/jour.model';



/* if (!!token) {
    options.headers.append('Authorization', 'Bearer ' + token);
}
return options; */ 
@Injectable()
export class JourouvrableService {

  constructor(private http: HttpClient, private option: AbstractService   /* private option:AuthInterceptor */ ) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private urlconfig= SERVER_URL +'api/param/conges/global';
  private urlactivationconfig= SERVER_URL +'api/conge/update/param/jourglobals';


  public getAllConfig<Response>() {
    return this.http.get<Jour[]>(this.urlconfig);
  }

  public  JourActivation(jour:Jour[]): Observable<HttpResponse<Jour[]>>  {
    return this.http.put<Jour[]>(this.urlactivationconfig ,jour,{headers:this.option.getOption().headers ,observe:'response'}) ;
    }
}

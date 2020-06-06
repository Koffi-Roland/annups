import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AbstractService } from '../config/abstract.service';
import { SERVER_URL } from '../app.constants';

import { createRequestOption } from '../shared';
import { TypeConge } from '../models/typeconge.model';
import { Ferier } from '../models/ferier.model';
import { Employe } from '../models/employe';
import { Conge } from '../models/conge.model';




@Injectable()
export class CongeService {

  constructor(private http: HttpClient, private option: AbstractService   /* private option:AuthInterceptor */) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/typeconges';
  private listypecongeurl = SERVER_URL + 'api/typeconges/list';
  private urlconge = SERVER_URL + 'api/conges';
  private urlJourFerier= SERVER_URL + 'api/jourferries/list';
  private urlFerier= SERVER_URL + 'api/jourferries';
  private urlMatriculeEmploye=SERVER_URL + 'api/employesbymatricule';
  private urlnombrejours=SERVER_URL + 'api/conges/nbr';
  private urlvaliderconge=SERVER_URL + 'api/conges/valider';
  private urlSearchAdvanced=SERVER_URL + 'api/conges/search';


  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', 'api/conges/upload', formdata,  {
      reportProgress: true,
      responseType: 'text',
     // headers?: this.option.getOption().headers
     // observe: 'response'
    });
 
    return this.http.request(req);
  }

  searchAdvancedConge(matricule?: string,debut?: string, fin?: string, etat?:boolean,req?: any) {
    const options = createRequestOption(req);
    console.log('search');
   //    return this.http.get<Projet[]>(this.urlAdvancedSearch+ `/?nom=${nom}&prenom=${prenom}&label=${label}&datecreation=${datecreation}&datefin=${datefin}&datedebut=${datedebut}`, { params: options, observe: 'response' });
    return this.http.get<Conge[]>(this.urlSearchAdvanced+ `/?matricule=${matricule}&debut=${debut}&fin=${fin}&etat=${etat}`, {headers: this.option.getHeaderString(), params: options, observe: 'response' });
  }

/* 
  validerConge(conge:any,decision:any): Observable<HttpResponse<any>> {  //: Observable<HttpResponse<Projet[]>>
   
    return this.http.put<any>(this.urlvaliderconge + `?conge=${conge}&decision=${decision}`, { headers: this.option.getOption().headers, observe: 'response' });
  }
 */

  validerConge(conge:any): Observable<HttpResponse<any>> {  //: Observable<HttpResponse<Projet[]>>
   
    return this.http.put<any>(this.urlvaliderconge + `?conge=${conge}`,conge, { headers: this.option.getOption().headers, observe: 'response' });
  }

  getNombreJour(debut:any,fin:any,user:any): Observable<HttpResponse<any>> {  //: Observable<HttpResponse<Projet[]>>
   
    return this.http.get<any>(this.urlnombrejours + `?debut=${debut}&fin=${fin}&user=${user}`, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public saveConge(conge:Conge) : Observable<HttpResponse<Conge>>{

    console.log("my url "+this.url);
    return this.http.post<Conge>(this.urlconge,conge,{headers:this.option.getOption().headers ,observe:'response'});
  }

  getEmployeByMatricule(key:any): Observable<HttpResponse<Employe>> {  //: Observable<HttpResponse<Projet[]>>
   
    return this.http.get<Employe>(this.urlMatriculeEmploye + `/?matricule=${key}`, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public getAllTypeconge<Response>() {
    return this.http.get<TypeConge[]>(this.listypecongeurl);
  }

  public getAllFerier<Response>() {
    return this.http.get<any[]>(this.urlFerier, this.option.getOption());
  }
  public configJourFerier(ferier: Ferier[]): Observable<HttpResponse<Ferier[]>> {
    return this.http.post<Ferier[]>(this.urlJourFerier, ferier, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public saveTypeConge(typeconge:TypeConge) : Observable<HttpResponse<TypeConge>>{

    console.log("my url "+this.url);
    return this.http.post<TypeConge>(this.url, typeconge,{headers:this.option.getOption().headers ,observe:'response'});
  }
  public updateTypeConge(typeconge:TypeConge) : Observable<HttpResponse<TypeConge>>{

    console.log("my url "+this.url);
    return this.http.put<TypeConge>(this.url, typeconge,{headers:this.option.getOption().headers ,observe:'response'});
  }
  query(req?: any): Observable<HttpResponse<TypeConge[]>> {
    const options = createRequestOption(req);
    console.log('ici');
    return this.http.get<TypeConge[]>(this.url, {headers: this.option.getOption().headers, params: options, observe: 'response' });
}


queryConge(req?: any): Observable<HttpResponse<Conge[]>> {
  const options = createRequestOption(req);
  console.log('ici');
  return this.http.get<Conge[]>(this.urlconge, {headers: this.option.getOption().headers, params: options, observe: 'response' });
}

onDelete(id: any) {
  return this.http.delete(this.url+`/${id}`,{headers: this.option.getOption().headers, observe: 'response' });
}

onDeleted(jour: any) {
  return this.http.delete(this.urlFerier+`/${jour}`,{headers: this.option.getOption().headers, observe: 'response' });
}

}

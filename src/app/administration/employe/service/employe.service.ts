import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared/model/request-util';
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
export class EmploiService {

  constructor(private http: HttpClient, private option: AbstractService   /* private option:AuthInterceptor */) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/employes';
  private urlemployes = SERVER_URL + 'api/employelists';
  private urlEmployeById = SERVER_URL + 'api/employesbyid';
  private urlEmployeByMatricule = SERVER_URL + 'api/employesbymatricule';
  private urlEmployeByFilsOne = SERVER_URL + 'api/employesbyfilsone';
  private urlEmployeByFils = SERVER_URL + 'api/employesbyfils';
  private urlEmployeByFilson = SERVER_URL + 'api/employesbyfilson';
  private urlEmployeParent = SERVER_URL + 'api/findemployesparent';
  private urlEmpAdvancedSearch = SERVER_URL + 'api/employelikesearchadvanced';
  private urlhasProject = SERVER_URL + 'api/hasproject';
  private urlProjetByEmploye = SERVER_URL + 'api/projetbyemploye';
  private urlTacheByProjet = SERVER_URL + 'api/tachebyid';
  private urlFonction = SERVER_URL + 'api/listfonctions';
  private urlService = SERVER_URL + 'api/listservices';
  private urlDroit = SERVER_URL + 'api/droits';
  private urlEmployeByService = SERVER_URL + 'api/employesbyservice';
  private urlEmployeTemporaire = SERVER_URL + 'api/tempemployes';
  private urlEmployeActivation = SERVER_URL + 'api/employes/etat';
  private urlFindUserDroits = SERVER_URL + 'api/finduserdroits';
  private urlInitpassword = SERVER_URL + 'api/account/change_password_by_admin';
  private urlSearch = SERVER_URL + 'api/employes/search';
  private urlConfigCongeEmploye = SERVER_URL + 'api/conges/update/param/jouremployes'




  public configCongeEmploye(id: any, jour: Jour[]): Observable<HttpResponse<Jour[]>> {
    return this.http.post<Jour[]>(this.urlConfigCongeEmploye + `?employe=${id}`, jour, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public initPassword(password: any, id: any): Observable<HttpResponse<any>> {
    console.log("my url " + this.url);
    return this.http.post(this.urlInitpassword + `?id=${id}`, password, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public getEmployes<Response>(page: number, size: number) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.url + `?page=${page}&size=${size}`);
  }

  public getUserDroits<Response>(matricule: any) {
    return this.http.get(this.urlFindUserDroits + `?matricule=${matricule}`, this.option.getOption());
  }
  /*  public saveEmploye(employe:Employe) : Observable<HttpResponse<Employe>>{
     console.log("my url "+this.url);
     return this.http.post<Employe>(this.url, employe,{headers:this.option.getOption().headers ,observe:'response'}) ;
     } */
  public EmployeActivation(id: any, value: any): Observable<HttpResponse<Employe>> {
    return this.http.put<Employe>(this.urlEmployeActivation + `/?id=${id}&etat=${value}`, id, { headers: this.option.getOption().headers, observe: 'response' });
  }
  /*  EmployeActivation(id: any,value:any) {
     return this.http.get(this.urlEmployeParent + `/${id}`)
       .pipe(map(res => res));
   } */
  public getProjetByEmploye<Response>(employe: string) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.urlProjetByEmploye + `?employe=${employe}`);
  }

  getEmployeById(id: string) {
    return this.http.get(this.urlEmployeById + `/${id}`, this.option.getOption());
  }

  public getEmployeByMatricule<Response>(matricule: any) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get<Employe>(this.urlEmployeByMatricule + `?matricule=${matricule}`, this.option.getOption());
  }

  query(req?: any): Observable<HttpResponse<Employe[]>> {
    const options = createRequestOption(req);
    console.log('ici');
    return this.http.get<Employe[]>(this.urlemployes, { headers: this.option.getOption().headers, params: options, observe: 'response' });
  }


  searchEmploye(req?: any) {
    const options = createRequestOption(req);
    return this.http.get<Employe[]>(this.urlSearch + `?key=${req}`, { headers: this.option.getOption().headers, params: options, observe: 'response' });
  }

  public getAllFonction<Response>() {
    console.log("my url fff " + this.urlFonction);
    return this.http.get<Fonction[]>(this.urlFonction);
  }

  public getAllDroit<Response>() {
    return this.http.get<Droit[]>(this.urlDroit);
  }

  public getAllService<Response>() {
    return this.http.get<Service[]>(this.urlService);
  }

  public getTacheByProjet<Response>(id: string) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.urlTacheByProjet + `?id=${id}`, this.option.getOption());
  }


  getEmployeByService<Response>(id: any) {

    return this.http.get<any>(this.urlEmployeByService + `?service=${id}`);

  }

  public deleteEmploye(employe) {
    return this.http.delete(this.url + '/' + employe.id);
  }
  /* 
   public saveEmploye(employe:Employe) : Observable<HttpResponse<Employe>>{
 
     console.log("my url "+this.url);
     return this.http.post<Employe>(this.url, employe,{observe:'response'});
   }
 */


  public saveEmploye(employe: Employe): Observable<HttpResponse<Employe>> {
    console.log("my url " + this.url);
    return this.http.post<Employe>(this.url, employe, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public updateEmploi(employe: Employe): Observable<HttpResponse<Employe>> {
    console.log("my url " + this.url);
    return this.http.put<Employe>(this.url, employe, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public updateEmploye(employe: EmployeTempo): Observable<HttpResponse<EmployeTempo>> {

    console.log("my url " + this.url);
    return this.http.post<EmployeTempo>(this.urlEmployeTemporaire, employe, { headers: this.option.getOption().headers, observe: 'response' });
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


  getEmployeByFils(id: string) {
    return this.http.get(this.urlEmployeByFils + `/${id}`)
      .pipe(map(res => res));
  }
  getEmployeByFilson(id: string) {
    return this.http.get(this.urlEmployeByFilson + `/${id}`)
      .pipe(map(res => res));
  }
  getEmployeByFilsOne(id: string) {
    return this.http.get(this.urlEmployeByFilsOne + `/${id}`)
      .pipe(map(res => res));
  }

  getEmployeParent(id: string) {
    return this.http.get(this.urlEmployeParent + `/${id}`)
      .pipe(map(res => res));
  }
  hasProject(id: string) {
    return this.http.get(this.urlhasProject + `?id=${id}`)
      .pipe(map(res => res));
  }

  advancedSearch(nom: string, prenom: string, service: string, fonction: string, telPro: string, telAbbr: string, page: number, size: number) {
    return this.http.get(this.urlEmpAdvancedSearch + `/?nom=${nom}&prenom=${prenom}&service=${service}&fonction=${fonction}&telPro=${telPro}&telAbbr=${telAbbr}&page=${page}&size=${size}`)
      .pipe(map(res => res));
  }
}

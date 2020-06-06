import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';

import { Employe, Projet } from '../models';
import { SERVER_URL } from '../app.constants';
import { createRequestOption } from '../shared/model/request-util';
import { AbstractService } from '../config/abstract.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeService {

  constructor(private http: HttpClient, private option: AbstractService) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/employes';
  private urlEmployeById = SERVER_URL + 'api/employesbyid';
  private urlEmployeByFilsOne = SERVER_URL + 'api/employesbyfilsone';
  private urlEmployeByFils = SERVER_URL + 'api/employesbyfils';
  private urlEmployeByFilson = SERVER_URL + 'api/employesbyfilson';
  private urlEmployeParent = SERVER_URL + 'api/findemployesparent';
  private urlEmpAdvancedSearch = SERVER_URL + 'api/employelikesearchadvanced';
  private urlhasProject = SERVER_URL + 'api/hasproject';
  private urlProjetByEmploye = SERVER_URL + 'api/projetbyemploye';
  private urlTacheByProjet = SERVER_URL + 'api/tachebyid';
  private urlCountSearchEmploye = SERVER_URL + 'api/employescount';
  private urlFindUserDroits = SERVER_URL + 'api/finduserdroits';
  private urlhasRoleSuivie = SERVER_URL + 'api/hassuivie';


  public getUserDroits<Response>(matricule: any) {
    return this.http.get(this.urlFindUserDroits + `?matricule=${matricule}`, this.option.getOption());
  }
  public getEmployes<Response>(page: number, size: number) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.url + `?page=${page}&size=${size}`, this.option.getOption());
  }


  public getProjetByEmploye<Response>(employe: any) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.urlProjetByEmploye + `?employe=${employe}`, this.option.getOption());
  }

  getProjetByEmploye2(employe: any, req?: any): Observable<HttpResponse<Projet[]>> {  //: Observable<HttpResponse<Projet[]>>
    const options = createRequestOption(req);
    console.log('search');

    return this.http.get<Projet[]>(this.urlProjetByEmploye + `/?employe=${employe}`, { headers: this.option.getHeaderString(), params: options, observe: 'response', });
  }
  public saveProjet(projet: Projet): Observable<Projet> {

    console.log("my url " + this.url);
    return this.http.post<Projet>(this.url, projet, this.option.getOption())
      .pipe(
        // catchError(this.handleError('addHero', hero))
      );
  }


  public getTacheByProjet<Response>(id: any) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.urlTacheByProjet + `?id=${id}`, this.option.getOption());
  }
  /*    backoff(maxTries, ms) {

      return pipe(
        retryWhen(attempts => range(1, maxTries)
          .pipe(
            zip(attempts, (i) => i),
            map(i => i * i),
            mergeMap(i =>  timer(i * ms))
          )
        )
      );
     } */

  public searchEmployes(key: string, page: number, size: number) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.url + `/${key}/?page=${page}&size=${size}`)
      .pipe(map(res => res));
    // .map((res: Response) => res.json);

  }
  public searchEmployesCount(rc: string) {
    // return this.http.get<Employe[]>(this.url);
    return this.http.get(this.urlCountSearchEmploye + `?rc=${rc}`)
      .pipe(map(res => res));
    // .map((res: Response) => res.json);

  }

  public deleteEmploye(employe) {
    return this.http.delete(this.url + '/' + employe.id);
  }

  public createEmploye(employe) {
    return this.http.post<Employe>(this.url, employe);
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

  getEmployeById(id: string) {
    return this.http.get(this.urlEmployeById + `/${id}`)
      .pipe(map((res: Employe) => res));
  }
  getEmployeByFils(id: string) {
    return this.http.get(this.urlEmployeByFils + `/${id}`)
      .pipe(map(res => res));
  }
  getEmployeByFilson(id: any) {
    return this.http.get(this.urlEmployeByFilson + `/${id}`)
      .pipe(map(res => res));
  }
  getEmployeByFilsOne(id: any) {
    return this.http.get(this.urlEmployeByFilsOne + `/${id}`)
      .pipe(map(res => res));
  }

  getEmployeParent(id: any) {
    return this.http.get(this.urlEmployeParent + `/${id}`)
      .pipe(map(res => res));
  }
  hasProject(id: any) {
    return this.http.get(this.urlhasProject + `?id=${id}`)
      .pipe(map(res => res));
  }
  hasSuivie(id: any) {
    return this.http.get(this.urlhasRoleSuivie + `?id=${id}`)
      .pipe(map(res => res));
  }

  advancedSearch(nom: string, prenom: string, service: string, fonction: string, telPro: string, telAbbr: string, page: number, size: number) {
    return this.http.get(this.urlEmpAdvancedSearch + `/?nom=${nom}&prenom=${prenom}&service=${service}&fonction=${fonction}&telPro=${telPro}&telAbbr=${telAbbr}&page=${page}&size=${size}`)
      .pipe(map(res => res));
  }
}

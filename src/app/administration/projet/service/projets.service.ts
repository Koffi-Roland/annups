import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { SERVER_URL } from '../../../app.constants';
import { createRequestOption } from '../../../shared/model/request-util';
import { Projet } from '../../../models';
import { Employe } from '../../../models/employe';
import { Droit } from '../../../models/droit';
import { ResponseWrapper } from '../../../shared';
import { AuthInterceptor } from '../../../blocks/interceptor/auth.interceptor';
import { employeState } from '../../../employe';
import { AbstractService } from '../../../config/abstract.service';
import { Tache } from '../../../models/tache';


/* if (!!token) {
    options.headers.append('Authorization', 'Bearer ' + token);
}
return options; */
@Injectable()
export class ProjetsService {

  constructor(private http: HttpClient, private option: AbstractService   /* private option:AuthInterceptor */) { }

  // private employeUrl = 'http://localhost:8080/employe-portal/employe';
  private url = SERVER_URL + 'api/projets';
  private urlprojetadmin = SERVER_URL + 'api/listprojetadmin';
  private urlProjetUpdate = SERVER_URL + 'api/projetbyid';
  private urlEmployebyToService = SERVER_URL + 'api/employes/service';

  private urlAffecterEmployebyProjet = SERVER_URL + 'api/projets/affecter';
  private urlRetirerEmployebyProjet = SERVER_URL + 'api/projets/retirer';
  private urlChangeChefProjet = SERVER_URL + 'api/projets/changer';
  private urlEmployeByService = SERVER_URL + 'api/employes/projetsbyservice/';
  private urlEmployeByServiceId = SERVER_URL + 'api/employes/service/id';

  private urlAjouterOneTache = SERVER_URL + 'api/projets/tasks/one';
  private urlAjouterManyTache = SERVER_URL + 'api/projets/tasks/many';
  private urlAffecterNiveauTache = SERVER_URL + 'api/projets/tasks/niveau';
  private urlValiderProjet = SERVER_URL + 'api/projets/terminer';
  private urlCloturerProjet = SERVER_URL + 'api/projets/cloturer';
  private urldelete = SERVER_URL + 'api/projets';
  private urlProjetByEtat = SERVER_URL + 'api/projets/state';
  private urlSponsor = SERVER_URL + 'api/employes/sponsor';
  private urlAbandonner = SERVER_URL + 'api/projets/abandonner';
  private urlActiverProjet = SERVER_URL + 'api/projets/reactiver';
  private urlSimpleSearch = SERVER_URL + 'api/simplesearchprojet';
  private urlModifierTache = SERVER_URL + 'api/projets/tasks';

  searchProjet(req?: any) {
    const options = createRequestOption(req);
    console.log('search');
    return this.http.get<Projet[]>(this.urlSimpleSearch, { headers: this.option.getHeaderString(), params: options, observe: 'response' });
  }

  getSponsor<Response>() {

    return this.http.get<any>(this.urlSponsor, this.option.getOption());

  }


  public getAllProjetByEtat<Response>(etat: any, page: number, size: number) {
    return this.http.get<Projet[]>(this.urlProjetByEtat + `?etat=${etat}&page=${page}&size=${size}`, this.option.getOption());
  }

  public affecterNiveauTache(employe: any, projet: any, progression: any, datemaj): Observable<HttpResponse<Tache>> {

    return this.http.put<Tache>(this.urlAffecterNiveauTache + `?employe=${employe}&projet=${projet}&progression=${progression}&dateMaj=${datemaj}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  getEmployeByService<Response>(id: any) {

    return this.http.get<any>(this.urlEmployeByServiceId + `?service=${id}`, this.option.getOption());

  }

  public getAllEmployeService<Response>() {
    return this.http.get<any[]>(this.urlEmployebyToService, this.option.getOption());
  }
  public onActiveProjet(projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlActiverProjet + `?projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }
 
  onDelete(id: any) {
    return this.http.delete(this.urldelete + `/${id}`, { headers: this.option.getOption().headers, observe: 'response' });
  }
  getProjetById(id: any): Observable<Projet> {
    return this.http.get<Projet>(this.urlProjetUpdate + `/${id}`, this.option.getOption());
  }
  public saveProjet(projet: Projet): Observable<HttpResponse<Projet>> {

    return this.http.post<Projet>(this.url, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public affecterChefProjet(employe: any, projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlAffecterEmployebyProjet + `?employe=${employe}&projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }


  public abandonnerProjet(projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlAbandonner + `?projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }
  //changer chef projet
  public changerChefProjet(employe: any, projet: any): Observable<HttpResponse<Projet>> {

    return this.http.post<Projet>(this.urlChangeChefProjet + `?employe=${employe}&projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public ajouterManyTacheProjet(tache: any[]): Observable<HttpResponse<Tache[]>> {

    return this.http.post<Tache[]>(this.urlAjouterManyTache, tache, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public ajouterTacheProjet(tache: any): Observable<HttpResponse<Tache>> {

    return this.http.post<Tache>(this.urlAjouterOneTache, tache, { headers: this.option.getOption().headers, observe: 'response' });
  }


  public modifierTacheProjet(tache: any): Observable<HttpResponse<Tache>> {

    return this.http.put<Tache>(this.urlModifierTache, tache, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public cloturerProjet(projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlCloturerProjet + `?projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public validerProjet(projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlValiderProjet + `?projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }
  public retirerChefProjet(projet: any): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.urlRetirerEmployebyProjet + `?projet=${projet}`, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  public updateProjet(projet: Projet): Observable<HttpResponse<Projet>> {

    return this.http.put<Projet>(this.url, projet, { headers: this.option.getOption().headers, observe: 'response' });
  }

  query(req?: any): Observable<HttpResponse<Projet[]>> {
    const options = createRequestOption(req);
    console.log('ici');
    return this.http.get<Projet[]>(this.urlprojetadmin, { headers: this.option.getOption().headers, params: options, observe: 'response' });
  }


  /*  public getEmployes<Response>(page: number, size: number) {
     // return this.http.get<Employe[]>(this.url);
     return this.http.get(this.url + `?page=${page}&size=${size}`);
   }
 
   public getProjetByEmploye<Response>(employe:string) {
     // return this.http.get<Employe[]>(this.url);
     return this.http.get(this.urlProjetByEmploye + `?employe=${employe}`);
   }
  */
  /*   getProjetByEmploye2(employe:string,req?: any): Observable<HttpResponse<Projet[]>> {  //: Observable<HttpResponse<Projet[]>>
      const options = createRequestOption(req);
      console.log('search');
      return this.http.get<Projet[]>(this.urlProjetByEmploye + `/?employe=${employe}`, { params: options, observe: 'response' });
    }
   */



  /* public getAllFonction() <Response>(employe:string) {
      // return this.http.get<Employe[]>(this.url);
      return this.http.get(this.urlProjetByEmploye + `?employe=${employe}`);
    } */

  /*  public getAllFonction<Response>() {
     console.log("my url fff "+this.urlFonction);
     return this.http.get<Fonction[]>(this.urlFonction);
   }
 
   public getAllDroit<Response>() {
     return this.http.get<Droit[]>(this.urlDroit);
   }
 
   public getAllService<Response>() {
     return this.http.get<Service[]>(this.urlService);
   }
 
   public getTacheByProjet<Response>(id:string) {
     // return this.http.get<Employe[]>(this.url);
     return this.http.get(this.urlTacheByProjet + `?id=${id}`);
   } */


  /*  getEmployeByService<Response>(id:any){
     
     return this.http.get<any>(this.urlEmployeByService + `?service=${id}`);
   
   } 
    */
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

  /*   public searchEmployes(key: string, page: number, size: number) {
      // return this.http.get<Employe[]>(this.url);
      return this.http.get(this.url + `/${key}/?page=${page}&size=${size}`)
        .pipe(map(res => res));
      // .map((res: Response) => res.json);
   
  
  
    }
  
    public deleteEmploye(employe) {
      return this.http.delete(this.url + '/' + employe.id);
    } */
  /* 
   public saveEmploye(employe:Employe) : Observable<HttpResponse<Employe>>{
 
     console.log("my url "+this.url);
     return this.http.post<Employe>(this.url, employe,{observe:'response'});
   }
 */


  /* public saveEmploye(employe:Employe) : Observable<Employe>{

   console.log("my url "+this.url);
   return this.http.post<Employe>(this.url, employe,this.option.getOption()) 
   .pipe(
    // catchError(this.handleError('addHero', hero))
   );
 } */





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

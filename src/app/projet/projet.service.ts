import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map, take, retryWhen, mergeMap, catchError, retry, tap} from 'rxjs/operators';
import {pipe, range, timer, zip} from 'rxjs';
import {createRequestOption} from '../shared/model/request-util';
import {Projet} from '../models';
import {SERVER_URL} from '../app.constants'
import {AbstractService} from '../config/abstract.service';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ProjetService {

    constructor(private http: HttpClient,private option: AbstractService) {}

    // private employeUrl = 'http://localhost:8080/employe-portal/employe';
    private url = SERVER_URL + 'api/projets';
    private urlSimpleSearch = SERVER_URL + 'api/simplesearchprojet';
    private urlAdvancedSearch = SERVER_URL + 'api/advancedsearchprojet';
    private urlAffectProjetById =  SERVER_URL + 'api/affectprojetsbyid';
   //  private urlProAdvancedSearch = SERVER_URL +  'api/advancedsearchprojet';
    public getProjets<Response>(page: number, size: number) {
        return this.http.get(this.url + `?page=${page}&size=${size}`);
    }

    query(req?: any): Observable<HttpResponse<Projet[]>> {
        const options = createRequestOption(req);
        console.log('ici');
        return this.http.get<Projet[]>(this.url, {headers: this.option.getHeaderString(), params: options, observe: 'response' });
    }
    // recherche simple function
    searchProjet(req?: any) {
      const options = createRequestOption(req);
      console.log('search');
      return this.http.get<Projet[]>(this.urlSimpleSearch, {headers: this.option.getHeaderString(),params: options, observe: 'response' });
    }


// recherche avancée function
    searchAdvancedProjet(label: string,nom: string,prenom : string, datecreation?:any,datedebut?:any,datefin?:any,req?: any) {
      const options = createRequestOption(req);
      console.log('search');
     //    return this.http.get<Projet[]>(this.urlAdvancedSearch+ `/?nom=${nom}&prenom=${prenom}&label=${label}&datecreation=${datecreation}&datefin=${datefin}&datedebut=${datedebut}`, { params: options, observe: 'response' });
      return this.http.get<Projet[]>(this.urlAdvancedSearch+ `/?nom=${nom}&prenom=${prenom}&label=${label}`, {headers: this.option.getHeaderString(), params: options, observe: 'response' });
    }

    find(id: string): Observable<any> {
        return this.http.get(`${this.urlAffectProjetById}?id=${id}`, this.option.getOption())
      .pipe(map((res) => res));
  }

 /* return this.http.get(this.urlEmployeByFils + `/${id}`)
  .pipe(map(res => res));
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

//    public searchEmployes(key: string, page: number, size: number) {
//        // return this.http.get<Employe[]>(this.url);
//        return this.http.get(this.url + `/${key}/?page=${page}&size=${size}`)
//            .pipe(map(res => res));
//        // .map((res: Response) => res.json);
//
//
//    }
//
//    public deleteEmploye(employe) {
//        return this.http.delete(this.url + '/' + employe.id);
//    }
//
//    public createEmploye(employe) {
//        return this.http.post<Employe>(this.url, employe);
//    }
//
//    private handleError(error: HttpErrorResponse) {
//        if (error.error instanceof ErrorEvent) {
//            const x = 'Erreur *******';
//            // A client-side or network error occurred. Handle it accordingly.
//            // console.error('An error occurred:', error.error.message);
//            return x;
//        } else {
//            // The backend returned an unsuccessful response code.
//            // The response body may contain clues as to what went wrong,
//
//            console.error(
//                `Backend returned code ${error.status}, ` +
//                `body was: ${error.error}`);
//        }
//        // return an observable with a user-facing error message
//        return throwError(
//            'Something bad happened; please try again later.');
//    }
//
//    getEmployeById(id: string) {
//        return this.http.get(this.urlEmployeById + `/${id}`)
//            .pipe(map((res: Employe) => res));
//    }
//    getEmployeByFils(id: string) {
//        return this.http.get(this.urlEmployeByFils + `/${id}`)
//            .pipe(map(res => res));
//    }
//    getEmployeByFilson(id: string) {
//        return this.http.get(this.urlEmployeByFilson + `/${id}`)
//            .pipe(map(res => res));
//    }
//    getEmployeByFilsOne(id: string) {
//        return this.http.get(this.urlEmployeByFilsOne + `/${id}`)
//            .pipe(map(res => res));
//    }
//
//    getEmployeParent(id: string) {
//        return this.http.get(this.urlEmployeParent + `/${id}`)
//            .pipe(map(res => res));
//    }
//
//    advancedSearch(nom: string, prenom: string, service: string, fonction: string, telPro: string, telAbbr: string, page: number, size: number) {
//        return this.http.get(this.urlEmpAdvancedSearch + `/?nom=${nom}&prenom=${prenom}&service=${service}&fonction=${fonction}&telPro=${telPro}&telAbbr=${telAbbr}&page=${page}&size=${size}`)
//            .pipe(map(res => res));
//    }
}

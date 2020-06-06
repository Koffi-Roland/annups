import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiHttpInterceptor } from 'ng-jhipster';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class AbstractService {

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) {

    }


    getOption() {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (token === null) {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' })
            }

            return httpOptions;
        } else {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })
            }
            return httpOptions;
        }
    }
    getHeaderString() {
        const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
        if (token === null) {

            return new HttpHeaders({ 'Content-Type': 'application/json' })

        } else {

            return new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token })

        }
    }


    /* 
        requestIntercept(options?: RequestOptionsArgs): RequestOptionsArgs {
            const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
            if (token) {
                options.headers.append('Authorization', 'Bearer ' + token);
            }
            return options; 
        }
    
        responseIntercept(observable: Observable<Response>): Observable<Response> {
            return observable; // by pass
        }
     */



}

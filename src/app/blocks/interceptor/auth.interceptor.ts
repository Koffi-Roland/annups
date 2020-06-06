import { Observable } from 'rxjs/Observable';
import { RequestOptionsArgs, Response } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { JhiHttpInterceptor } from 'ng-jhipster';
import { HttpHeaders } from '@angular/common/http';

export class AuthInterceptor extends JhiHttpInterceptor {

    constructor(
        private localStorage: LocalStorageService,
        private sessionStorage: SessionStorageService
    ) {
        super();
    }

  
 


/* getOption() {
    const token = this.localStorage.retrieve('authenticationToken') || this.sessionStorage.retrieve('authenticationToken');
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer '+token })
      }
  /*   if (!!token) {
        options.headers.append('Authorization', 'Bearer ' + token);
    } 
    return httpOptions; 
} */






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

    


}

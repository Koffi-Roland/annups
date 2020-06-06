import {Injectable} from '@angular/core';
//import {JhiLanguageService} from 'ng-jhipster';

import { Principal, AuthServerProvider } from '../shared';

@Injectable()
export class LoginService {
    //        private languageService: JhiLanguageService,
    public code:any;
    constructor(
//        private languageService: JhiLanguageService,
        private principal: Principal,
        private authServerProvider: AuthServerProvider
    ) {}

    login(credentials, callback?) {
        const cb = callback || function () {};

        return new Promise((resolve, reject) => {
            this.authServerProvider.login(credentials).subscribe((data) => {
                this.principal.identity(true).then((account) => {
                    // After the login the language will be changed to
                    // the language selected by the user during his registration
                    //                    if (account !== null) {
                    //                        this.languageService.changeLanguage(account.langKey);
                    //                    }
                    resolve(data);
                  
                    console.log("j su laa " + JSON.stringify(data));
                });
                
                return cb(); 
            }, (err) => {
                
               // JSON.parse(error.json()._body).errors[0]
              /*   this.code=JSON.parse(err._body).AuthenticationException;
                    console.error("code fffff "+this.code);  */

/*                 console.error("code fffff "+this.code); 
 */                this.logout();
                reject(err);
               // stringify()
                return cb(err);
            });
        });
    }

    loginWithToken(jwt, rememberMe) {
        return this.authServerProvider.loginWithToken(jwt, rememberMe);
    }

    logout() {
        console.log(this.authServerProvider.getToken());
        this.authServerProvider.logout().subscribe();
        this.principal.authenticate(null);
    }
}

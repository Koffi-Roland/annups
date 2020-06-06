import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Subject} from 'rxjs/Subject';
import {ParametreResourceService} from './parametre-resource.service';

@Injectable()
export class ParametreService {
    private parametres: any;
    private projetExist = false;
    private projetState = new Subject<any>();
    constructor(private parametreResource: ParametreResourceService) {

    }

    getParametres(force?: boolean): Promise<any> {
        if (force === true) {
            this.parametres = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.parametres) {
            return Promise.resolve(this.parametres);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.parametreResource.get().toPromise().then((settings) => {
            console.log("Parametre ++ " + JSON.stringify(settings))
            if (settings) {

                this.parametres = settings;
                this.projetExist = this.parametres.projetExist;
                console.log("Return projetExist " + this.projetExist);
            } else {
                this.parametres = null;
                this.projetExist = null;
            }
            this.projetState.next(this.parametres);
            return this.parametres;
        }).catch((err) => {
            this.parametres = null;
            this.projetExist = null;
            this.projetState.next(this.parametres);
            return null;
        });
    }

    getProfilExist(): boolean {
        return this.projetExist;
    }

    isParametresResolved(): boolean {
        return this.parametres !== undefined;
    }
    getProjetState(): Observable<any> {
        return this.projetState.asObservable();
    }
}

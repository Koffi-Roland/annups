import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {ParametreService} from './parametre.service';
//import { LoginModalService } from '../login/login-modal.service';
import {ParametreStateStorageService} from './parametre-state-storage.service';
import {StateStorageService} from '../auth/state-storage.service';
@Injectable()
export class ProjetRouteAccessService implements CanActivate {
    //  private loginModalService: LoginModalService,
    myprojet: boolean;
    constructor(
        private router: Router,
        private stateStorageService: StateStorageService,
        private parametres: ParametreService,
        private parametreStateStorageService: ParametreStateStorageService) {
    }
    canActivate(route: ActivatedRouteSnapshot): boolean | Promise<boolean> {

        //        const projet = 
        //        route.data['projet'] = this.getProjetExistAndVerify();
        console.log("kkkkkkk " + route.data['projet'])
        if (this.getProjetExistAndVerify() == false) {

            this.router.navigateByUrl('/home');
            return false;
        } else {
            return this.getProjetExistAndVerify();
        }


    }



    checkProjetExistAndStore(): Promise<boolean> {
        if (this.parametreStateStorageService.getProjetExist() == null) {
            const parametres = this.parametres;
            return Promise.resolve(parametres.getParametres().then((settings) => {

                if (settings) {
                    this.parametreStateStorageService.storeProjetExist(settings.projetExist);
                    this.parametreStateStorageService.storeNomSociete(settings.nomSociete);
                    return true;
                }
                //this.router.navigateByUrl('/home');
                return false;
            }))
                ;
        }
    }
    VerifyProjetExistAndStore(): Promise<boolean> {
        if (this.parametreStateStorageService.getProjetExist() != null) {
            const parametres = this.parametres;
            return Promise.resolve(parametres.getParametres().then((settings) => {

                if (settings && settings.projetExist != this.parametreStateStorageService.getProjetExist()) {
                    this.parametreStateStorageService.storeProjetExist(settings.projetExist);
                    return true;
                }
                return false;
            }))
                ;
        }
    }

    getProjetExistAndVerify(): boolean {
        this.VerifyProjetExistAndStore()
        this.checkProjetExistAndStore();
        console.log('oook ')
        return this.parametreStateStorageService.getProjetExist();
    }
    //    canActive(): boolean | Promise<boolean> {
    //        return this.getProjetExistAndVerify()
    //         
    //         )
    //         
    //    }
}

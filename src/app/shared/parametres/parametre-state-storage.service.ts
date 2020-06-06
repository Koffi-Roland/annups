import {Injectable} from '@angular/core';
import {SessionStorageService} from 'ngx-webstorage';

@Injectable()
export class ParametreStateStorageService {
    constructor(
        private $sessionStorage: SessionStorageService
    ) {}

    getPreviousState() {
        return this.$sessionStorage.retrieve('previousState');
    }

    resetPreviousState() {
        this.$sessionStorage.clear('previousState');
    }

    //    storePreviousState(previousStateName, previousStateParams) {
    //        const previousState = {'name': previousStateName, 'params': previousStateParams};
    //        this.$sessionStorage.store('previousState', previousState);
    //    }
    //
    //    getDestinationState() {
    //        return this.$sessionStorage.retrieve('destinationState');
    //    }
    storeNomSociete(nom: string) {
        this.$sessionStorage.store('nomSociete', nom);
    }
    getNomSociete() {
        this.$sessionStorage.retrieve('nomSociete');
    }

    storeProjetExist(projetExist: boolean) {
        this.$sessionStorage.store('projetExist', projetExist);
    }

    getProjetExist() {
        return this.$sessionStorage.retrieve('projetExist');
    }

    //    storeDestinationState(destinationState, destinationStateParams, fromState) {
    //        const destinationInfo = {
    //            'destination': {
    //                'name': destinationState.name,
    //                'data': destinationState.data,
    //            },
    //            'params': destinationStateParams,
    //            'from': {
    //                'name': fromState.name,
    //            }
    //        };
    //        this.$sessionStorage.store('destinationState', destinationInfo);
    //    }
}

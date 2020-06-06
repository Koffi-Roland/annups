
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {ProjetRouteAccessService, UserRouteAccessService} from '../../../../shared/';
import { ProjetParEtatComponent } from './projet.etat.component';




@Injectable()
export class ProjetParEtatResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}


export const PROJET_PAR_ETAT_ROUTES: Routes = [
    { path: 'show/projet/etat',
        component: ProjetParEtatComponent,
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET'],
            pageTitle: 'projet par etat'

        },

    },
    // ...profileDialogRoute
];




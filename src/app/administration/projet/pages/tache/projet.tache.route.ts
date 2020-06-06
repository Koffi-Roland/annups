
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {UserRouteAccessService} from '../../../../shared/';
import {ProjetRouteAccessService} from '../../../../shared/';
import { TacheComponent } from './projet.tache.component';


/* @Injectable()
export class TacheResolvePagingParams implements Resolve<any> {

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
} */

export const TACHE_ROUTES: Routes = [
    { path: 'projet/tache/:id',
        component: TacheComponent,
        canActivate: [UserRouteAccessService],
        
      /*   resolve: {
            'pagingParams': TacheResolvePagingParams
        }, */
        data: {
            //authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET'],
            authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET','ROLE_CONSULTER_PROJET'],

            pageTitle: 'tache list'
        },

    }, 
    // ...profileDialogRoute
]; 




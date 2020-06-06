
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {UserRouteAccessService} from '../../../../shared/';
import {ProjetRouteAccessService} from '../../../../shared/';
import { ProjetListComponent } from './projet.list.component'; 


@Injectable()
export class ProjetResolvePagingParams implements Resolve<any> {

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

export const PROJET_LIST_ROUTES: Routes = [
    { path: 'projet/list',
        component: ProjetListComponent,
        canActivate: [UserRouteAccessService],
        
        resolve: {
            'pagingParams': ProjetResolvePagingParams
        },
        data: {
            //authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET'],
            authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET','ROLE_CONSULTER_PROJET','ROLE_SPONSOR_PROJET'],

            pageTitle: 'projet list'
        },

    }, 
    // ...profileDialogRoute
]; 




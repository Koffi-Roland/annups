
import { Injectable } from '@angular/core';
import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import { UserRouteAccessService } from '../../../../shared/';
import { ProjetRouteAccessService } from '../../../../shared/';
import { CourierListComponent } from './courier.list.component';


//import {NavbarComponent} from '../layouts/navbar/navbar.component';

//export const navbarRoute: Route = {
//    path: 'admin',
//    component: NavbarComponent,
//    outlet: 'navbar'
//};

//const PROJET_ROUTES = [
//    //  ...ADMIN_HOME_ROUTE,
//    ...PROJET_DETAIL_ROUTE,
//]


@Injectable()
export class CourrierResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) { }

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


export const COURIER_LIST_ROUTES: Routes = [
    {
        path: 'courrier/list',
        component: CourierListComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            'pagingParams': CourrierResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_ADMIN_COURRIER', 'ROLE_VISIONNER_COURRIER', 'ROLE_GESTION_COURRIER'],
            pageTitle: 'courier list'
        },

    },
    // ...profileDialogRoute 
];




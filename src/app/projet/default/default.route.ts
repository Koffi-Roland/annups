//import {DefaultComponent} from './default.component';
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
import {
    PROJET_DETAIL_ROUTE, PROJET_ROUTES
} from '../';
import {ProjetRouteAccessService} from '../../shared/';

//import {NavbarComponent} from '../layouts/navbar/navbar.component';

//export const navbarRoute: Route = {
//    path: 'admin',
//    component: NavbarComponent,
//    outlet: 'navbar'
//};

export const DEFAULT_ROUTES = [
    ...PROJET_ROUTES,
    ...PROJET_DETAIL_ROUTE,
]

//@Injectable()
//export class ProjetResolvePagingParams implements Resolve<any> {
//
//    constructor(private paginationUtil: JhiPaginationUtil) {}
//
//    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
//        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
//        return {
//            page: this.paginationUtil.parsePage(page),
//            predicate: this.paginationUtil.parsePredicate(sort),
//            ascending: this.paginationUtil.parseAscending(sort)
//        };
//    }
//}


export const projetState : Routes = [
    ...DEFAULT_ROUTES
];




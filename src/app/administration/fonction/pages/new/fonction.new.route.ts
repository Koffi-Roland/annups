
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {ProjetRouteAccessService, UserRouteAccessService} from '../../../../shared/';
import { FonctionNewComponent } from './fonction.new.component';

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
/* 
*/
@Injectable()
export class FonctionResolvePagingParams implements Resolve<any> {

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
 

export const FONCTION_NEW_ROUTES: Routes = [
    { path: 'fonction/new',
        component: FonctionNewComponent,
        resolve: {
            'pagingParams': FonctionResolvePagingParams
        },
        canActivate: [UserRouteAccessService],
      
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'fonction new'
        },

    },
    // ...profileDialogRoute
];





import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
import { UserRouteAccessService } from '../../../shared';
import { TypeRetourNewComponent } from './typeretour.new.component';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';

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
export class TypeRetourResolvePagingParams implements Resolve<any> {

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
 

export const TYPERETOUR_NEW_ROUTES: Routes = [
    { path: 'typeretour/new',
        component: TypeRetourNewComponent,
        resolve: {
            'pagingParams': TypeRetourResolvePagingParams
        },
        canActivate: [UserRouteAccessService],
      
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'typeretour new'
        },

    },
    // ...profileDialogRoute
];




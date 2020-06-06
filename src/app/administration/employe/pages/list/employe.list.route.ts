
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {ProjetRouteAccessService, UserRouteAccessService} from '../../../../shared/';
import { EmployeListComponent } from './employe.list.component';


@Injectable()
export class EmploiResolvePagingParams implements Resolve<any> {

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

export const EMPLOYE_LIST_ROUTES: Routes = [
    { path: 'employe/list',
        component: EmployeListComponent,
        resolve: {
            'pagingParams': EmploiResolvePagingParams
        },
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'employe liste'

        },

    },
    // ...profileDialogRoute
];




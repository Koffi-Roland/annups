
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {UserRouteAccessService} from '../../../../shared/';
import {ProjetRouteAccessService} from '../../../../shared/';
import { ServicesNewComponent } from './services.new.component';

//import {NavbarComponent} from '../layouts/navbar/navbar.component';

@Injectable()
export class ServicesResolvePagingParams implements Resolve<any> {

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

export const SERVICES_NEW_ROUTES: Routes = [
    { path: 'service/new',
        component: ServicesNewComponent,
        resolve: {
            'pagingParams': ServicesResolvePagingParams
        },
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'service new'
        },

    },
    // ...profileDialogRoute
];




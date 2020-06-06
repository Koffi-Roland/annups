import { RouterModule } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Injectable } from '@angular/core';
import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { HomeCongeComponent } from './home.conge.component';
import { TYPE_CONGE_ROUTES } from '../typeconge/typeconge.route';
import { FERIER_ROUTES } from '../jourferier/ferier.route';
import { PROGRAM_CONGE_ROUTES } from '../programconge/programconge.route';
import { UPLOAD_ROUTES } from '../upload/upload.route';


@Injectable()
export class CongeResolvePagingParams implements Resolve<any> {

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

export const CONGE_HOME_ROUTE: Routes = [

    {
        path: 'home',
        component: HomeCongeComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            'pagingParams': CongeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'conge list'
        },

    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    ...TYPE_CONGE_ROUTES,
    ...FERIER_ROUTES,
    ...PROGRAM_CONGE_ROUTES,
    ...UPLOAD_ROUTES

];
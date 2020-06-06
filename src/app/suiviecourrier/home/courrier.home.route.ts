import { RouterModule } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { Injectable } from '@angular/core';
import { Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';
import { CourrierHomeComponent } from './courrier.home.component';
import { SUIVIE_CCOURIER_NEW_ROUTES } from '../envoie/envoi.route';


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

export const COURRIER_HOME_ROUTE: Routes = [

    {
        path: 'home',
        component: CourrierHomeComponent,
        canActivate: [UserRouteAccessService],
        resolve: {
            'pagingParams': CourrierResolvePagingParams
        },
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_ADMIN_COURRIER', 'ROLE_VISIONNER_COURRIER', 'ROLE_GESTION_COURRIER'],
            pageTitle: 'courier list'
        },

    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    ...SUIVIE_CCOURIER_NEW_ROUTES,

];





/* export const COURIER_LIST_ROUTES: Routes = [
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
 */



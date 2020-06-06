import {ProjetDetailComponent} from './projet-detail.component';
//import {ProjetRouteAccessService} from '../../shared/';
import {ProjetRouteAccessService} from '../../shared/';
import {UserRouteAccessService} from '../../shared/';
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';

import {JhiPaginationUtil} from 'ng-jhipster';

//export const PROJET_DETAIL_ROUTE: Route = {
//    path: 'detail',
//    //    redirectTo:"ddddd",
//    component: ProjetDetailComponent,
//    data: {
//        //authorities: ['ROLE_ADMIN'],
//        pageTitle: 'detail projet',
//        projet: 'projet'
//    },
//    canActivate: [ProjetRouteAccessService]
//
//};
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

export const PROJET_DETAIL_ROUTE: Routes = [
  /*  {
        path: 'projet/detail',
        //    redirectTo:"ddddd",
        component: ProjetDetailComponent,
        data: {
            //authorities: ['ROLE_ADMIN'],
            pageTitle: 'detail projet',
            projet: true
        },
        canActivate: [ProjetRouteAccessService],
        // canActivate: [ProjetRouteAccessService], runGuardsAndResolvers
    },*/
    {
      path: 'projet/:id',
      component: ProjetDetailComponent,
      data: {
          pageTitle: 'Détail projet'
      },
      canActivate: [UserRouteAccessService,ProjetRouteAccessService],
  }
];




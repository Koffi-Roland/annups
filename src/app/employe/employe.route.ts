import { Routes, Route, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { EmployeComponent, EmployeAdvanceComponent, EmployeDetailComponent } from './';
import { EmployeDetailDialogComponent } from './employe.detail.dialog.component';
import { DetailComponent } from './detailprojet/detail.component';
import { Injectable } from '@angular/core';
import { JhiPaginationUtil } from 'ng-jhipster';
import {UserRouteAccessService} from '../shared';  

/* export const EMPLOYE_ROUTE: Route = {
  path: '',
  component: EmployeComponent,
//  children: adminState,
  data: {
    authorities: [],
    pageTitle: 'employe' 
  }
}; */


@Injectable()
export class ProjetDetailResolvePagingParams implements Resolve<any> {

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

export const employeState: Routes = [


  {
    path: 'employeadvance',
    component: EmployeAdvanceComponent,
    data: {
      title: 'employe-advance',
      // send: Employe,
    }
  },
  {
    path: 'employe', component: EmployeComponent,
    data: {
      title: 'employe',
    }
  },
  {
    path: 'projet-detail/:id', component: DetailComponent,
    canActivate: [UserRouteAccessService], 
    data: {
      authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET','ROLE_CONSULTER_PROJET'],
      pageTitle: 'projet new'
    },
    resolve: {
      'pagingParams': ProjetDetailResolvePagingParams
  },
    /* data: {
      title: 'employe',
    } */
  } 
  /*  , {
    path: 'login', component: LoginComponent,
    data: {
      title: 'login'
    }
  }, */

  ,
  { path: 'employe/:id', component: EmployeDetailComponent },

  // ...profileDialogRoute
];

export const employeDialogState: Routes = [


  {
    path: 'employedetaildialog/:id',
    component: EmployeDetailDialogComponent,
    outlet: 'popup'
  },


];

/*
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
*/
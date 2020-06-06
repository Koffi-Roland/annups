
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {ProjetRouteAccessService, UserRouteAccessService} from '../../../../shared';
import { JourouvrableComponent } from './jourouvrable.component';




export const JOUROUVRABLE_ROUTES: Routes = [
    { path: 'configuration/jourouvrable',
        component: JourouvrableComponent,
      
        canActivate: [UserRouteAccessService],
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'ferier '

        },

    },
    // ...profileDialogRoute
];




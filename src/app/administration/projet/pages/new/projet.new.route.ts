
import {Injectable} from '@angular/core';
import {Route, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate} from '@angular/router';
import {JhiPaginationUtil} from 'ng-jhipster';
//import {
//    PROJET_DETAIL_ROUTE
//} from './';
import {UserRouteAccessService} from '../../../../shared/';
import {ProjetRouteAccessService} from '../../../../shared/';
import { ProjetNewComponent } from './projet.new.component'; 



export const PROJET_NEW_ROUTES: Routes = [
    { path: 'projet/new',
        component: ProjetNewComponent,
        canActivate: [UserRouteAccessService],
        data: {
            //authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET'],
            authorities: ['ROLE_ADMIN','ROLE_ADMIN_PROJET','ROLE_CONSULTER_PROJET'],

            pageTitle: 'projet new'
        },

    }, 
    // ...profileDialogRoute
]; 




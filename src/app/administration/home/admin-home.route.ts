import {Routes, Route, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';
import {UserRouteAccessService} from '../../shared/';
import { EMPLOYE_LIST_ROUTES } from '../employe/pages/list/employe.list.route';
import { EMPLOYE_NEW_ROUTES } from '../employe/pages/new/employe.new.route';
import { EMPLOYE_UPDATE_ROUTES } from '../employe/pages/update/employe.update.route';
import { FONCTION_NEW_ROUTES } from '../fonction/pages/new/fonction.new.route';
import { PROJET_NEW_ROUTES } from '../projet/pages/new/projet.new.route';
import { SERVICES_NEW_ROUTES } from '../services/page/new/services.new.route';
import { PROJET_LIST_ROUTES } from '../projet/pages/list/projet.list.route';
import { PROJET_UPDATE_ROUTES } from '../projet/pages/update/projet.update.route';
import { COURIER_NEW_ROUTES } from '../courier/page/new/courier.new.route';
import { COURIER_LIST_ROUTES } from '../courier/page/list/courier.list.route';
import { COURIER_UPDATE_ROUTES } from '../courier/page/update/courier.update.route';
import { PROJET_AFFECTATION_UPDATE_ROUTES } from '../projet/pages/affecterprojet/projet.affecterprojet.route';
import { PROJET_CHANGECHEF_UPDATE_ROUTES } from '../projet/pages/changerchefprojet/projet.changerchefprojet.route';
import { AJOUTER_TACHE_ROUTES } from '../projet/pages/ajoutertache/projet.ajoutertache.route';
import { TACHE_ROUTES } from '../projet/pages/tache/projet.tache.route';
import { TYPERETOUR_NEW_ROUTES } from '../typeretour/pages/typeretour.new.route';
import { PROJET_PAR_ETAT_ROUTES } from '../projet/pages/projetparetat/projet.etat.route';
import { JOUROUVRABLE_ROUTES } from '../configuration/pages/jourouvrable/jourouvrable.route';


export const ADMIN_HOME_ROUTE: Routes = [
    {
        path: 'home',
        //    redirectTo:"ddddd",
        component: AdminHomeComponent,
        data: {
            authorities: ['ROLE_EMPLOYE'],
            // authorities: ['ROLE_ADMIN'],

            pageTitle: 'backoffice'
        },
        canActivate: [UserRouteAccessService],
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full' 
    },
    // ...profileDialogRoute

    ...EMPLOYE_NEW_ROUTES ,
    ...EMPLOYE_LIST_ROUTES ,
    ...EMPLOYE_UPDATE_ROUTES,
    ...FONCTION_NEW_ROUTES,
    ...PROJET_NEW_ROUTES,
    ...SERVICES_NEW_ROUTES,
    ...PROJET_LIST_ROUTES,
    ...PROJET_UPDATE_ROUTES,
    ...COURIER_NEW_ROUTES,
    ...COURIER_LIST_ROUTES,
    ...COURIER_UPDATE_ROUTES,
    ...PROJET_AFFECTATION_UPDATE_ROUTES,
    ...PROJET_CHANGECHEF_UPDATE_ROUTES,
    ...AJOUTER_TACHE_ROUTES,
    ...TACHE_ROUTES,
    ...TYPERETOUR_NEW_ROUTES,
    ...PROJET_PAR_ETAT_ROUTES,
    ...JOUROUVRABLE_ROUTES
    
];



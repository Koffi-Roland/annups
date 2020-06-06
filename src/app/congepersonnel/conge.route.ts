import {Routes, Route} from '@angular/router';

import {NavbarComponent} from '../layouts/navbar/navbar.component';
import { CongeComponent } from './conge.component';
import { CONGE_HOME_ROUTE } from './home/home.conge.route';


 const CONGE_ROUTES = [
    ...CONGE_HOME_ROUTE,
]; 

export const congeState: Routes = [
    {
        path: 'conge',
        component: CongeComponent,
        //  outlet: 'navbar',
        children: CONGE_ROUTES
    },
    // ...profileDialogRoute
];





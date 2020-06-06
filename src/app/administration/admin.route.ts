import {Routes, Route} from '@angular/router';
import {AdminComponent} from './admin.component';
import {
    //    adminDefaultRoute,
    //    produitRoute,
    //    categorieRoute,
    //    profileRoute,
    //    utilisateurRoute,
    //    profileDialogRoute
    ADMIN_HOME_ROUTE,
    UPDATE_INFO_ROUTE
} from './';

/* adminDefaultRoute,
...produitRoute,
categorieRoute,
...profileRoute,
utilisateurRoute  */

import {NavbarComponent} from '../layouts/navbar/navbar.component';

//export const navbarRoute: Route = {
//    path: 'admin',
//    component: NavbarComponent,
//    outlet: 'navbar'
//};

const ADMIN_ROUTES = [
    ...ADMIN_HOME_ROUTE,
    UPDATE_INFO_ROUTE
]

export const adminState: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        //  outlet: 'navbar',
        children: ADMIN_ROUTES
    },
    // ...profileDialogRoute
];





import { Routes, Route, RouterModule } from '@angular/router';
import { AccueilComponent } from './accueil.component';
import { RechercheAvanceeComponent } from './recherche-avancee.component';
import {  UpdateLinkComponent} from './update-link.component';
import {  employeState, employeDialogState} from '../employe';
/* import {
    adminDefaultRoute,
    produitRoute,
    categorieRoute,
    profileRoute,
    utilisateurRoute,
    profileDialogRoute
} from './'; */

/* adminDefaultRoute,
...produitRoute,
categorieRoute,
...profileRoute,
utilisateurRoute  */

/* const ACCUEIL_ROUTES = [
   
]  */
export const ACCUEIL_ROUTE: Route = {
    path: 'home',
    //    redirectTo:"ddddd",
    component: AccueilComponent,
    data: {
        authorities: [],
        pageTitle: 'home'
    },
   

};


export const accueilState: Routes = [
    ACCUEIL_ROUTE,

    {
        path: 'rechercheavancee',
        component: RechercheAvanceeComponent,
        data: {
            title: 'Recherche avancée'

        }
    },

    {
        path: 'update', component: UpdateLinkComponent,
        data: {
          title: 'update'
        }
      },
      ...employeState,
      ...employeDialogState
];





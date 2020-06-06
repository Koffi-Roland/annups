import {Routes, Route} from '@angular/router';

import {NavbarComponent} from '../layouts/navbar/navbar.component';
import { COURRIER_HOME_ROUTE } from './home/courrier.home.route';
import { SuivieCourrierComponent } from './suiviecourrier.component';

const COURRIER_ROUTES = [
    ...COURRIER_HOME_ROUTE,
];

export const courrierState: Routes = [
    {
        path: 'suiviecourrier',
        component: SuivieCourrierComponent,
        //  outlet: 'navbar',
        children: COURRIER_ROUTES
    },
    // ...profileDialogRoute
];





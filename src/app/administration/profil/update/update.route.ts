import {Routes, Route, RouterModule} from '@angular/router';
import {UpdateEmployeInfoTempComponent} from './update-employe-info-temp.component';
import {UserRouteAccessService} from '../../../shared/';
export const UPDATE_INFO_ROUTE: Route = {
    path: 'updateprofil',
    //    redirectTo:"ddddd",
    component: UpdateEmployeInfoTempComponent,
    data: {
        authorities: ['ROLE_EMPLOYE'], 
        pageTitle: 'Mise à jour info personnel'
    },
    canActivate: [UserRouteAccessService]

};

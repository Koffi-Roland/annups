import { Route } from '@angular/router';
import { ChangePasswordComponent } from './changepassword.component';
import { UserRouteAccessService } from '../../shared';
export const CHANGE_PASSWORD_ROUTE: Route = {
    path: 'change_password',
    //    redirectTo:"ddddd",
    component: ChangePasswordComponent,
    data: {
      authorities: ['ROLE_EMPLOYE'],
      pageTitle: 'change mot de passe'
    },
    canActivate: [UserRouteAccessService],

    
   };
  
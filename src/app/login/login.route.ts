import { Route, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { CHANGE_PASSWORD_ROUTE } from '../changepassword/pages/changepassword.route';

export const LOGIN_ROUTE: Routes = [
  CHANGE_PASSWORD_ROUTE,
  {
  path: 'login',
  //    redirectTo:"ddddd",
  component: LoginComponent,
  data: {
    authorities: [],
    pageTitle: 'Authentification'
  }

 }];

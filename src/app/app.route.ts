import { Route } from '@angular/router';

import { AccueilComponent } from './accueil/accueil.component';
//import {NavbarComponent} from './layouts/navbar/navbar.component';
export const navbarRoute: Route = {
    path: '',
    component: AccueilComponent,
   // outlet: 'navbar',
    //pathMatch: "full"
};

//const routes: Routes = [
//  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//  { path: 'dashboard', component: DashboardComponent },
//  { path: 'detail/:id', component: HeroDetailComponent },
//  { path: 'heroes', component: HeroesComponent }
//];

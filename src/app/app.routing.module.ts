import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeComponent } from './employe/employe.component';
import { EmployeAdvanceComponent } from './employe/employe.advance.component';
import { AccueilComponent } from './accueil/accueil.component';
import { UpdateLinkComponent } from './accueil/update-link.component';
import { RechercheAvanceeComponent } from './accueil/recherche-avancee.component';
import { EmployeDetailComponent } from './employe/employe.detail.component';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import {LoginComponent } from './login/login.component';
import { Employe } from './models';
import { enableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { ChangePasswordComponent } from './changepassword/pages/changepassword.component';
// import {AddemployeComponent} from './employe/add-employe.component';

const routes: Routes = [

  {
    path: 'home', component: AccueilComponent,
    data: {
      title: 'home',
      mykey: '',
    }
  },
  

  {
    path: 'rechercheavancee', component: RechercheAvanceeComponent,
    data: {
      title: 'Recherche avancée'

    }
  },

  {
    path: 'employeadvance', component: EmployeAdvanceComponent,
    data: {
      title: 'employe-advance',
     // send: Employe,
    }
  }
  ,
  {
    path: 'employe', component: EmployeComponent,
    data: {
      title: 'employe',
      send: Employe,
    }
  }
  ,
  {
    path: 'change_password', component: ChangePasswordComponent,
    data: {
      title: 'employe'

    }
  }
  , {
    path: 'login', component: LoginComponent,
    data: {
      title: 'login'
    }
  },
  {
    path: 'update', component: UpdateLinkComponent,
    data: {
      title: 'update'
    }
  }
  ,
  { path: 'employe/:id', component: EmployeDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

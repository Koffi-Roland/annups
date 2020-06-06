import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//
//LoginModalService
import {
    AppSharedLibsModule,
    AppSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    /*UserService,*/
    StateStorageService,
    Principal,
    HasAnyAuthorityDirective,
    ParametreService,
    ParametreResourceService,
    ParametreStateStorageService
   // ProjetExistActived,

} from './';
import {LOGIN_ROUTE, LoginComponent, LoginService} from '../login'
import {NavbarComponent} from '../layouts/navbar/navbar.component'   
 import { ChangePasswordComponent } from '../changepassword/pages/changepassword.component';
import { ChangePasswordService } from '../changepassword/service/changepassword.service'; 

@NgModule({
    imports: [
        AppSharedLibsModule,
        AppSharedCommonModule,
        RouterModule.forRoot(LOGIN_ROUTE, {useHash: true}),
    ],
    declarations: [
        LoginComponent,
        NavbarComponent,
        ChangePasswordComponent,
        HasAnyAuthorityDirective
    ],
    providers: [
        LoginService,
        AccountService,
        ChangePasswordService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
         ParametreService,
        ParametreResourceService,
        ParametreStateStorageService,
      //  ProjetExistActived,
        /*UserService, */
        DatePipe
    ],
    entryComponents: [LoginComponent],
    exports: [
        AppSharedCommonModule,
        LoginComponent,
        ChangePasswordComponent,
        HasAnyAuthorityDirective,
        DatePipe,
        NavbarComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppSharedModule {}

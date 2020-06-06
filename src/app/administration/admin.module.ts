//import {BrowserModule} from '@angular/platform-browser';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {CommonModule} from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared'
import { UpdateEmployeInfoTempComponent, adminState, AdminComponent, AdminHomeComponent } from './';
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { NgForm, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatePipe } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { EmployeListComponent } from './employe/pages/list/employe.list.component';
import { EmployeNewComponent } from './employe/pages/new/employe.new.component';
import { EmployeUpdateComponent } from './employe/pages/update/employe.update.component';

import { FonctionNewComponent } from './fonction/pages/new/fonction.new.component';

import { ProjetNewComponent } from './projet/pages/new/projet.new.component';
import { ProjetListComponent } from './projet/pages/list/projet.list.component';

import { ServicesNewComponent } from './services/page/new/services.new.component';

import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FonctionResolvePagingParams } from './fonction/pages/new/fonction.new.route';
import { ServicesResolvePagingParams } from './services/page/new/services.new.route';
import { EmploiService } from './employe/service/employe.service';
import { FonctionService } from './fonction/service/fonction.service';
import { _ServicesService } from './services/service/services.service';
import { ProjetsService } from './projet/service/projets.service';
import { EmploiResolvePagingParams } from './employe/pages/list/employe.list.route';
import { ProjetResolvePagingParams } from './projet/pages/list/projet.list.route';
import { ProjetUpdateComponent } from './projet/pages/update/projet.update.component';
import { CourierNewComponent } from './courier/page/new/courier.new.component';
import { CourierService } from './courier/service/courier.service';
import { CourierListComponent } from './courier/page/list/courier.list.component';
import { CourierUpdateComponent } from './courier/page/update/courier.update.component';
import { CourrierResolvePagingParams } from './courier/page/list/courier.list.route';
import { AffectationProjetComponent } from './projet/pages/affecterprojet/projet.affecterprojet.component';
import { ChangerChefProjetComponent } from './projet/pages/changerchefprojet/projet.changerchefprojet.component';
import { AjouterTacheComponent } from './projet/pages/ajoutertache/projet.ajoutertache.component';
import { TacheComponent } from './projet/pages/tache/projet.tache.component';
import { TypeRetourNewComponent } from './typeretour/pages/typeretour.new.component';
import { TypeRetourService } from './typeretour/service/typeretour.service';
import { TypeRetourResolvePagingParams } from './typeretour/pages/typeretour.new.route';
import { DashboardService } from './home/dashboard.service';
import { ProjetParEtatComponent } from './projet/pages/projetparetat/projet.etat.component';
import { ProjetParEtatResolvePagingParams } from './projet/pages/projetparetat/projet.etat.route';
import { JourouvrableService } from './configuration/service/jourouvrable.service';
import { JourouvrableComponent } from './configuration/pages/jourouvrable/jourouvrable.component';


/* export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../../assets/i18n/modules/administration/admin', '.json');
} */
//import {
//    AccordionModule,
//    PaginationModule,
//    BsDropdownModule,
//    CollapseModule,
//    TooltipModule,
//    BsDatepickerModule,  
//    ModalModule,
//    BsModalService,
//    AlertModule,
//} from 'ngx-bootstrap';

//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        UpdateEmployeInfoTempComponent, AdminComponent, AdminHomeComponent, EmployeListComponent, EmployeNewComponent, EmployeUpdateComponent,
        ProjetParEtatComponent,TypeRetourNewComponent, FonctionNewComponent, ProjetNewComponent, ProjetListComponent, ServicesNewComponent, ProjetUpdateComponent, CourierNewComponent, CourierListComponent, CourierUpdateComponent, AffectationProjetComponent,ChangerChefProjetComponent,AjouterTacheComponent,
        TacheComponent,JourouvrableComponent
    ],
    imports: [
        AppSharedModule,
        //        CommonModule,
        //        BrowserModule,
        //        BrowserAnimationsModule,
        // FormsModule,
        RouterModule.forRoot(adminState, { useHash: true }),
        //        BsDropdownModule,
        //        PaginationModule,
        //        CollapseModule,
        //        AccordionModule,
        //        BsDatepickerModule,
        //        TooltipModule,
        //        AlertModule,
        //        PanelModule,
        //        NgbModule,
        // ModalModule,
       /*  TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            },
             isolate: true
        }) */
    ],
    providers: [
        Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
        EmploiService, _ServicesService, ServicesResolvePagingParams,
        FonctionService, FonctionResolvePagingParams, EmploiResolvePagingParams,
        ProjetsService, ProjetResolvePagingParams, CourierService,TypeRetourService,JourouvrableService,
        CourrierResolvePagingParams,TypeRetourResolvePagingParams,DashboardService,ProjetParEtatResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminModule {
    /*
      constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }*/
}

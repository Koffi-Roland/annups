import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccueilComponent, RechercheAvanceeComponent, UpdateLinkComponent, accueilState } from './'
import { Router } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { AppSharedModule } from '../shared';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

import { NgxSpinnerModule } from 'ngx-spinner';
import { Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';

import { EmployeComponent } from '../employe/employe.component'
import { EmployeDetailComponent } from '../employe/employe.detail.component';


import { EmployeAdvanceComponent } from '../employe/employe.advance.component';
import { EmployeService } from '../employe/employe.service';

import {
    AccordionModule,
    PaginationModule,
    BsDropdownModule,
    CollapseModule,
    TooltipModule,
    BsDatepickerModule,
    ModalModule,
    BsModalService,
    AlertModule,
} from 'ngx-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailModalService } from '../employe/detailmodal.service';
import { EmployeDetailDialogComponent } from '../employe/employe.detail.dialog.component';
import { EmployeModalDialogComponent } from '../employe/employe.detail.dialog.component';
import { DetailComponent } from '../employe/detailprojet/detail.component';
import { ProjetDetailResolvePagingParams } from '../employe';
import { NgForm, FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export function CreateTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/modules/accueil', '.json');
}

@NgModule({
    declarations: [
        AccueilComponent, RechercheAvanceeComponent, UpdateLinkComponent,
        EmployeComponent, EmployeDetailComponent, EmployeAdvanceComponent, EmployeDetailDialogComponent, EmployeModalDialogComponent
        , DetailComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(accueilState, { useHash: true }),
        BsDropdownModule,
        AppSharedModule,
        PaginationModule,
        CollapseModule,
        AccordionModule,
        BsDatepickerModule,
        TooltipModule,
        AlertModule,
        PanelModule,
        NgbModule,
        ModalModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: CreateTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    entryComponents: [
        EmployeModalDialogComponent,
    ],
    providers: [
        EmployeService, DetailModalService,
        Location,
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        ProjetDetailResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    //schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AccueilModule {
    /*
      constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }*/
}


import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppSharedModule} from '../shared'
import {Router} from '@angular/router';
import {PanelModule} from 'primeng/panel';

import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {NgxSpinnerModule} from 'ngx-spinner';
import {Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy} from '@angular/common';

import {
    projetState,
    ProjetResolvePagingParams,
    ProjetService,
    ProjetComponent,
    ProjetDetailComponent
} from './';
import {} from './projet.component'
import {} from './detail/projet-detail.component'
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

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        ProjetComponent, ProjetDetailComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(projetState, {useHash: true}),
        AppSharedModule
    ],
    providers: [
        Location,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ProjetService,ProjetResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
    //schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ProjetModule {
    /*
      constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }*/
}

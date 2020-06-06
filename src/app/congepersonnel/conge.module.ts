
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared'

import { Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';


import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { congeState } from './conge.route';
import { CongeService } from './conge.service';
import { CongeComponent } from './conge.component';
import { HomeCongeComponent } from './home/home.conge.component';
import { CongeResolvePagingParams } from './home/home.conge.route';
import { TypeCongeResolvePagingParams } from './typeconge/typeconge.route';
import { TypeCongeComponent } from './typeconge/typeconge.component';
import { FerierComponent } from './jourferier/ferier.component';
import { JourFerierResolvePagingParams } from './jourferier/ferier.route';
import { ProgramCongeResolvePagingParams } from './programconge/programconge.route';
import { ProgramCongeComponent } from './programconge/programconge.component';
import { UploadComponent } from './upload/upload.component';


export function CreateTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/modules/administration/admin', '.json');
}

@NgModule({
    declarations: [
        CongeComponent,
        HomeCongeComponent,
        TypeCongeComponent,
        FerierComponent,
        ProgramCongeComponent,
        UploadComponent
    ],
    imports: [
        AppSharedModule,
    
        RouterModule.forRoot( congeState, { useHash: true }),
      
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: CreateTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
        CongeService,CongeResolvePagingParams,TypeCongeResolvePagingParams,JourFerierResolvePagingParams,ProgramCongeResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CongeModule {
    /*
      constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }*/
}

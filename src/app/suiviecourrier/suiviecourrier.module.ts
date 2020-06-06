
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSharedModule } from '../shared'

import { Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';


import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { courrierState } from './suiviecourrier.route';
import { CourierService } from 'src/app/suiviecourrier/courier.service';
import { CourrierResolvePagingParams } from './home/courrier.home.route';
import { CourrierHomeComponent } from './home/courrier.home.component';
import { SuivieCourrierComponent } from './suiviecourrier.component';
import { CourierNewComponent } from './envoie/envoie.component';

export function CreateTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/modules/administration/admin', '.json');
}

@NgModule({
    declarations: [
        SuivieCourrierComponent,
        CourrierHomeComponent,
        CourierNewComponent
    ],
    imports: [
        AppSharedModule,
    
        RouterModule.forRoot( courrierState, { useHash: true }),
      
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
        CourierService,
        CourrierResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CourrierModule {
    /*
      constructor(router: Router) {
        console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    }*/
}

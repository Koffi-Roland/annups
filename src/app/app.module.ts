import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PanelModule } from 'primeng/panel';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppConfig } from './app.config';
import {AppSharedModule, UserRouteAccessService, ProjetRouteAccessService} from './shared';
import {customHttpProvider} from './blocks/interceptor/http.provider';
import { AdminModule } from './administration/admin.module';
import {ProjetModule} from './projet/projet.module'
import { AccueilModule, accueilState } from './accueil';
import {APP_BASE_HREF} from '@angular/common';
import { LayoutRoutingModule } from './layouts/layout-routing.module';
import {PaginationConfig} from './blocks/config/uib-pagination.config';

import {
  MainComponent,
  ErrorComponent,
} from './layouts';
import {AppComponent} from './app.component';
import { PageNotFoundComponent } from './not-found.component';
import {
  BsModalService,
} from 'ngx-bootstrap';
import { DataService } from './config/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './ngb-date-fr-parser-formatter';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AbstractService } from './config/abstract.service';
import { CourrierModule } from './suiviecourrier/suiviecourrier.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CongeModule } from './congepersonnel/conge.module';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json'); 
}

@NgModule({
  declarations: [
    MainComponent,
    ErrorComponent,
    PageNotFoundComponent,
    AppComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppSharedModule,
    NgxChartsModule,
    HttpClientModule,
    AdminModule,
    AccueilModule,
    ProjetModule,
    CourrierModule,
    CongeModule,
    SelectDropDownModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    RouterModule.forRoot(accueilState, { useHash: true }), 
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
       isolate: true
  }), ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  
  ],
  providers: [

  NgbDateFRParserFormatter,
    BsModalService,
    DataService,
    AppConfig,
    Location,
    UserRouteAccessService,
    ProjetRouteAccessService,
    PaginationConfig,
    AbstractService,
   // {provide: APP_BASE_HREF, useValue: 'annups'},
    { provide: LocationStrategy, useClass: HashLocationStrategy },
     customHttpProvider(),

  ],
  bootstrap: [MainComponent],
})

export class AppModule {
  /*
    constructor(router: Router) {
      console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }*/
}

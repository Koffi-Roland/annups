import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule, NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
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
    ProgressbarModule
} from 'ngx-bootstrap';
import {NgJhipsterModule} from 'ng-jhipster';
import {Ng2Webstorage} from 'ngx-webstorage';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {CookieModule} from 'ngx-cookie';
import {RouterModule} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {FileUploadModule} from 'primeng/fileupload';
import {NgxSpinnerModule} from 'ngx-spinner';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TabsModule } from 'ngx-bootstrap/tabs';
@NgModule({
    imports: [
       NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            //            i18nEnabled: false,
            //            defaultI18nLang: 'fr'
        }),
        InfiniteScrollModule,
        CookieModule.forRoot(),
        CommonModule,
        UiSwitchModule,
        NgxChartsModule,
        SelectDropDownModule,
        TableModule,
        DataTableModule,
        ButtonModule,
        PanelModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory
          }),
        MessagesModule,
        MessageModule,
        FileUploadModule,
        NgxSpinnerModule,
        BsDropdownModule.forRoot(),
        PaginationModule.forRoot(),
        CollapseModule.forRoot(),
        AccordionModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TooltipModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        ProgressbarModule.forRoot(),
        PanelModule,
        NgbModule.forRoot(),
        NgbDropdownModule.forRoot(),
        ModalModule.forRoot(),
        Ng2Webstorage.forRoot({prefix: 'annups', separator: '-'}),
        ReactiveFormsModule,
        FormsModule,
        ChartsModule,
       HttpClientModule,
       ShowHidePasswordModule.forRoot(),
          ],
    exports: [
        UiSwitchModule,
        CalendarModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        CommonModule,
        ChartsModule,
        NgxChartsModule,
        NgbModule,
        NgJhipsterModule,
        NgbDropdownModule,
        InfiniteScrollModule,
        RouterModule,
        TableModule,
        TabsModule,
        DataTableModule,
        ButtonModule,
        PanelModule,
        MessagesModule,
        MessageModule,
        FileUploadModule,
        AccordionModule,
        PaginationModule,
        BsDropdownModule,
        CollapseModule,
        ProgressbarModule,
        TooltipModule,
        BsDatepickerModule,
        ModalModule,
        SelectDropDownModule,
        ShowHidePasswordModule,
        // BsModalService,
      
        AlertModule,
        NgxSpinnerModule,
        Ng2Webstorage,
        TranslateModule
    ],
    providers: [
        BsModalService,
    ]
})
export class AppSharedLibsModule {}



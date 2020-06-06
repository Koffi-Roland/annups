import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';


import { Title } from '@angular/platform-browser';

import {
    AppSharedLibsModule,
    //   AlertComponent,
    // AlertService
    //    JhiLanguageHelper,
    //    FindLanguageFromKeyPipe,
    /*    JhiAlertComponent,
       JhiAlertErrorComponent */
} from './';

@NgModule({
    imports: [
        AppSharedLibsModule,
        ReactiveFormsModule,
        SelectDropDownModule
    ],
    declarations: [
        // AlertComponent,
        //        FindLanguageFromKeyPipe,
        /*    JhiAlertComponent,
           JhiAlertErrorComponent */
    ],
    providers: [
        //   AlertService
        //        JhiLanguageHelper,
        //        Title,
        //        {
        //            provide: LOCALE_ID,
        //            useValue: 'en'
        //        },
    ],
    exports: [
        AppSharedLibsModule,
        //  AlertComponent
        //        FindLanguageFromKeyPipe,
        /*  JhiAlertComponent,
         JhiAlertErrorComponent */
    ]
})
export class AppSharedCommonModule {}
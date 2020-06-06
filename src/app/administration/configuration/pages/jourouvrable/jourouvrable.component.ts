import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { NgxSpinnerService } from 'ngx-spinner';
import { TabsModule } from 'ngx-bootstrap';
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../../../app.constants';
import { Employe } from '../../../../models/employe';
import { StateStorageService } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
} from '../../../../app.constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { JourOuvrable } from '../../../../models/enum.jourouvrable';
import { Jour } from '../../../../models/jour.model';
import { JourouvrableService } from '../../service/jourouvrable.service';

//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-jourouvrable',
    templateUrl: './jourouvrable.component.html',
    styleUrls: ['./jourouvrable.component.css']
})
export class JourouvrableComponent implements OnInit/* , OnDestroy */ {
    isCollapsedSearch: Boolean;
    msg:any;
    @ViewChild('f') form: any;
    param = {value: ''};
    config:any;
    _langs: any;
    listJour = new Array<Jour>(); 
    activationSuccess:boolean;
    activationError: boolean;
    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
    };
    // jour: JourOuvrable;
    allConfig: Jour[];
    statusCode: any;
    constructor(

        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private stateStorageService: StateStorageService,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private modalService: BsModalService,
        private jourouvrableService: JourouvrableService

    ) {

        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);

    }

    ngOnInit() {
        this.getAllConfigGlobal();
    }


    getAllConfigGlobal(): Jour[] {
        this.jourouvrableService.getAllConfig()
            .subscribe(
                data => this.allConfig = data,
                errorCode => this.statusCode = errorCode);
        return this.allConfig;
    }

    onChange(value: boolean,config:any) {
        config.estOuvrable=value;
        this.config=config;
        this.listJour.push(config);
    

       
   this.jourouvrableService.JourActivation(this.listJour).subscribe(
         response => {

         this.param.value=this.config.label;

             this.msg = response.headers.get('x-annups-alert');
             console.error("msg"+this.msg);
            this.activationSuccess=true;
            this.getAllConfigGlobal();
            this.listJour = new Array();
            console.error("trouver"+this.listJour);
         },
         error => {
             this.msg = error.headers.get('x-annups-error');
             console.error("msg"+this.msg);

             this.activationError=true;
         }
     ); 
  
    // console.log("form end submitted!");
 
 
 
 
       }
 
}



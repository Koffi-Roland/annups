import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../../../app.constants';

import { SelectItem } from 'primeng/components/common/selectitem';

//import { Principal, User, UserService} from '../../shared';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
   } from '../../../../app.constants';   
@Component({
    selector: 'app-home-admin-courier-update',
    templateUrl: './courier.update.component.html',
    styleUrls: ['./courier.update.component.css']
})
export class CourierUpdateComponent implements OnInit/* , OnDestroy */ {
  
    isSaving:boolean;
    listRouteUrl: string = "/admin/courier/list";
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    @ViewChild('f') form: any;
   // entity: Employe = new Employe(null);
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
     
        private translate: TranslateService,
      

    ) {
       

    }
   

    ngOnInit() {

      
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme },{ dateInputFormat: 'DD-MM-YYYY'  });

    }
  

    private onSaveSuccess(result, headers) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        // this.activeModal.dismiss(result.body);
        console.error("consolidation");
    }

    private onSaveError() {
        this.isSaving = false;
    }


    onSubmit() {
        //   this.spinner.show();
      


    }



}





import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { CourierService } from '../../service/courier.service';
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
    selector: 'app-home-admin-courier-list',
    templateUrl: './courier.list.component.html',
    styleUrls: ['./courier.list.component.css']
})
export class CourierListComponent implements OnInit/* , OnDestroy */ {
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    search: any;
    allCourriers: any[];
    isSaving: boolean;
    errors: any;
    listRouteUrl: string = "/admin/courier/list";
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    isCollapsed : boolean = true;
    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
      };
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
        private courrierService: CourierService,

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });

    }
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };

    ngOnInit() {
        this.loadAll();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });

    }


    private onSaveSuccess(result, headers) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        // this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }


    loadAll() {
        this.spinner.show(); 
        this.courrierService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }


    onSubmit() {
        //   this.spinner.show();


    }

    private onSuccess(data, headers) {
        
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.allCourriers = data;
        setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        //  this.affichertout = false;
        console.log("liste de all fonctions +++++++++++ " + JSON.stringify(this.allCourriers));
    }
    /*   private onSaveSuccess(result) {
          //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
          this.isSaving = false;
          // this.activeModal.dismiss(result.body);
           console.error("message999999999"+result.headers.get('X-Token'));
      } */

    onError(error) {
        setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        //  this.alertService.error(error.error, error.message, null);
        this.errors = { 'error': error.error, 'message': error.message };
      
    }


    getAllCourriers(){
        this.courrierService.getAllCourrier()
            .subscribe(
                data => {
                    this.allCourriers = data;
                    return this.allCourriers;
                },
                errorCode => {
                    setTimeout(() => {
                        this.spinner.hide();
                      }, 1000);
                      this.errors = errorCode;
                      return [];
                }) ;
      
    }
 
}





import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { SelectItem } from 'primeng/components/common/selectitem';
import { Employe } from '../../../../models/employe';

import { Fonction, Service } from '../../../../models';
import { Droit } from '../../../../models/droit';
//import { Principal, User, UserService} from '../../shared';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateFRParserFormatter } from '../../../../ngb-date-fr-parser-formatter';
import { NgxSpinnerService } from 'ngx-spinner';
import { Services } from '@angular/core/src/view';
import { _ServicesService } from '../../service/services.service';
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
    LANGS,
} from '../../../../app.constants';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-home-admin-services-new',
    templateUrl: './services.new.component.html',
    styleUrls: ['./services.new.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ServicesNewComponent implements OnInit/* , OnDestroy */ {
    isCollapsedSearch: Boolean;
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
    isSaving: boolean;
    reverse: any;
    _langs: any;
    statusCode: any;
    new: boolean = true;
    update: boolean = false;
    allServices: Service[];
    param = {value: ''};
    @ViewChild('f') form: any;
    @ViewChild('formUpdate') formUpdate: any;
    msg: any;
    serviceSuccess: boolean = false;
    serviceError: boolean = false;
    serviceUpdateSuccess: boolean = false;
    serviceDeleteSuccess: boolean = false;
    entity: Service = new Service(null);
    constructor(

        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private formatService: NgbDateFRParserFormatter,
        private servicesService: _ServicesService,
        private translate: TranslateService

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });

        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);

    }


    ngOnInit() {

        // this.getAllServices();
        this.loadAll();

        this.new = true;
        this.update = false;
    }


    getAllServices(): Service[] {
        this.servicesService.getAllServices()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }


    loadAll() {
        this.servicesService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Services[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }

    updateService(service: any) {
        // console.error("id selectionner"+id);
        console.log("service" + JSON.stringify(service));
        /*update state*/
        this.new = false;
        this.update = true;
        this.entity = service;

    }

    addService() {
        this.new = true;
        this.update = false;
        this.entity = new Service(null);
    }



    onUpdate() {
        if (this.formUpdate.valid) {

            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));

            try {
                this.servicesService.updateService(this.entity).subscribe(response => {
                    this.msg = response.headers.get('x-annups-alert');
                    this.serviceUpdateSuccess=true;
                    this.new = true;
                    this.update = false;

                    this.formUpdate.reset();
                    this.loadAll();
                    //  this.getAllServices();
                    console.error("message update" + this.msg)

                },
                    error => {
                        this.serviceError=true;
                        this.msg = error.headers.get('x-annups-error');

                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }


    }





    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/admin/service/new'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }


    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.allServices = data;
        //  this.affichertout = false;
        console.log("liste de all fonctions +++++++++++ " + JSON.stringify(this.allServices));
    }
    /*  ngOnDestroy() {
         this.routeData.unsubscribe();
     } */

    private onSaveSuccess(result) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        console.log("message999999999" + result.headers.get('X-Token'));
        // this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }


    onSubmit() {

        if (this.form.valid) {

            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));

            try {
                this.servicesService.saveService(this.entity).subscribe(response => {
                    this.param.value=this.entity.label;
                    this.msg = response.headers.get('x-annups-alert');
                    this.serviceSuccess=true;
                    this.loadAll();
                    this.form.reset();
                    //  this.getAllServices();

                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.serviceError=true;

                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }



    }
    onDelete(id: any) {
        if (id) {

            this.servicesService.onDelete(id).subscribe(response => {

                //  this.getAllServices();
                this.msg = response.headers.get('x-annups-alert');
                this.serviceDeleteSuccess=true;
                this.loadAll();

                console.error("message " + this.msg);
                // this.formUpdate.reset();

            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    this.serviceError=true;


                });

        }

    }
}





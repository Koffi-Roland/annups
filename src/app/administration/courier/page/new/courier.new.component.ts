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
import { _ServicesService } from '../../../services/service/services.service';
import { EmploiService } from '../../../employe/service/employe.service';
import { Service } from '../../../../models';
import { Courrier } from '../../../../models/courrier';
import { TypeCourrier } from '../../../../models/typecourrier';
import { CourierService } from '../../service/courier.service';
import { TraitementCourrier } from '../../../../models/traitementcourrier';

@Component({
    selector: 'app-home-admin-courier-new',
    templateUrl: './courier.new.component.html',
    styleUrls: ['./courier.new.component.css']
})
export class CourierNewComponent implements OnInit/* , OnDestroy */ {

    allServices: Service[];
    alltypecourrier: TypeCourrier[];
    envoiCouriers = new Array<TraitementCourrier>();
    traitementCourrier: TraitementCourrier;
    isSaving: boolean;
    service: any;
    datePrevisionnelTraitement: any;
    typecourrier: any;
    serviceSelected = new Array<any>();
    serviceSelectedTempo = new Array<any>();

    traitementSelected = new Array<any>();
    courrierError: any;
    courrierSuccess: any;
    msg: any;
    // serviceSelected=[];

    statusCode: any;
    listRouteUrl: string = "/admin/employe/list";
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    @ViewChild('f') form: any;
    entity: Courrier = new Courrier(null);
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
        private _emploiService: EmploiService,
        private courrierService: CourierService,
        private translate: TranslateService,


    ) {


    }

    ngOnInit() {
        this.getAllService();
        this.getAllTypeCourrier();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });

    }


    getAllService(): Service[] {
        this._emploiService.getAllService()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }
    getAllTypeCourrier(): TypeCourrier[] {
        this.courrierService.getAllTypeCourrier()
            .subscribe(
                data => this.alltypecourrier = data,
                errorCode => this.statusCode = errorCode);
        return this.alltypecourrier;
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
    affectService() {
        if (this.service) {
            console.error("affichage du retour" + JSON.stringify(this.service));
            this.traitementCourrier = new TraitementCourrier(null);
            this.traitementCourrier.service = this.service;
            this.envoiCouriers.push(this.traitementCourrier);
            console.error("affichage " + JSON.stringify(this.envoiCouriers));
            this.serviceSelectedTempo.push(this.traitementCourrier);

            // console.error("dordgldjs"+this.serviceSelected);
        }

    }

    desactiverService(sel: any) {
        console.error("helooo yeah");
        if (this.serviceSelectedTempo.length >=0) {
            console.error("lenght"+this.serviceSelectedTempo.length);

            for (let i = 0; i < this.serviceSelectedTempo.length; i++) {

                console.error("formulaire active"+ JSON.stringify(sel));
                if( sel == this.serviceSelectedTempo[i]){
                    this.envoiCouriers.splice(i,1);
                    this.serviceSelectedTempo.splice(i,1);
                }
                console.error("formulaire dto" + "i " + i + " " + JSON.stringify(this.envoiCouriers[i]));

                // this.serviceSelected[i].service.datePrevisionnelTraitement;
                // console.error("affichage loooo"+ this.serviceSelectedTempo[i]);
            }



        }
    } 


    onSubmit() {
        //   this.spinner.show();
        if (this.form.valid) {
            console.error("length nombre789534" + this.serviceSelectedTempo.length);
            if (this.serviceSelectedTempo.length >= 0) {
                for (let i = 0; i < this.serviceSelectedTempo.length; i++) {

                    //console.log("this.form.value="+ JSON.stringify(this.serviceSelectedTempo[i]));
                    this.entity.envoiCouriers[i] = this.serviceSelectedTempo[i];
                    console.error("formulaire dto" + "i " + i + " " + JSON.stringify(this.serviceSelectedTempo[i]));

                    // this.serviceSelected[i].service.datePrevisionnelTraitement;
                    // console.error("affichage loooo"+ this.serviceSelectedTempo[i]);
                }
            }
            console.error("formulaire dto" + JSON.stringify(this.entity));

            this.courrierService.saveCourrier(this.entity).subscribe(
                response => {
                    this.msg = response.headers.get('x-annups-alert');
                    this.courrierSuccess = true;
                    this.form.reset();
                    this.envoiCouriers = new Array();
                    this.serviceSelectedTempo = new Array();
                },
                error => {
                    this.envoiCouriers = new Array();
                    this.serviceSelectedTempo = new Array();

                    this.msg = error.headers.get('x-annups-error');
                    this.courrierError = true;
                }
            );

            console.log("form end submitted!");




        }



    }



}





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
import { Employe } from '../../../../models/employe';
import { EmploiService } from '../../service/employe.service';
import { Fonction, Service } from '../../../../models';
import { Droit } from '../../../../models/droit';
//import { Principal, User, UserService} from '../../shared';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";

import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
} from '../../../../app.constants';
@Component({
    selector: 'app-home-admin-employe-new',
    templateUrl: './employe.new.component.html',
    styleUrls: ['./employe.new.component.css']
})
export class EmployeNewComponent implements OnInit/* , OnDestroy */ {
    isCollapsedSearch: Boolean;
    employes: Employe[];
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
    search: any
    employeid: any;
    simpleSearch: boolean;
    advanceSearch: boolean;
    affichertout: boolean;
    allFonctions: Fonction[];
    allServices: Service[];
    allDroits: Droit[];
    allEmployeService: Employe[];
    allEmployeOtherService: Employe[];
    sex: any;
    sexe: SelectItem[];
    statut: SelectItem[];
    langue: SelectItem[];
    statusCode: number;
    isSaving: Boolean;
    bsValue = new Date();
    bsRangeValue: Date[];
    maxDate = new Date();
    singleSelect: any = [];
    authorities: Droit[];
    radioValue: string;
    superior: boolean;
    other: boolean;
    parentVisibility: boolean;
    otherservice: Service;
    employeSuccess: boolean = false;
    employeError: boolean = false;
    msg: any;
    credentials: any;
    _langs: string;
    param = { value: '' };
    /*   isOpenSuccess = false;
      isOpenDanger:boolean=false; */
    dateDeNaissance: string;
    listRouteUrl: string = "/admin/employe/list";
    colorTheme = 'theme-dark-blue';
    imageError: boolean;
    filename: any;
    imageSrc: any;
    today: Date;
    willDate: Date;
    bsConfig: Partial<BsDatepickerConfig>;
    @ViewChild('f') form: any;
    @ViewChild('myInput') myInputVariable: any;

    entity: Employe = new Employe(null);
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
        private translate: TranslateService


    ) {


        this.sexe = [
            { label: 'Femme', value: 'F' },
            { label: 'Homme', value: 'M' }
        ]

        this.statut = [
            { label: 'Célibataire', value: 'C' },
            { label: 'Marié', value: 'M' },
            { label: 'Veuve/veuf', value: 'V' },
            { label: 'Divorcé', value: 'D' }
        ]
        this.langue = [
            { label: 'Francais', value: 'FR' },
            { label: 'Anglais', value: 'EN' }
        ]


        this.credentials = {};
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
        this.today = new Date();
        // this.maxDate = new Date();
        //this.minDate.setDate(this.minDate.getDate() - 1);
        // this.maxDate.setDate(this.maxDate.getDate() + 7);

    }
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };

    ngOnInit() {

        this.getAllFonction();
        this.getAllService();
        this.getAllDroit();
        this.initValues();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });

    }
    initValues() {
        this.superior = true;
        this.other = false;
    }

    getAllFonction(): Fonction[] {
        this._emploiService.getAllFonction()
            .subscribe(
                data => this.allFonctions = data,
                errorCode => this.statusCode = errorCode);
        return this.allFonctions;
    }
    getAllService(): Service[] {
        this._emploiService.getAllService()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }


    getAllDroit(): Droit[] {
        this._emploiService.getAllDroit()
            .subscribe(
                data => this.allDroits = data,
                errorCode => this.statusCode = errorCode);
        return this.allDroits;
    }

    activeOther() {
        this.other = true;
        this.superior = false;
    }
    activeSuperior() {
        this.other = false;
        this.superior = true;
    }

    getEmployeByService(): Employe[] {
        this._emploiService.getEmployeByService(this.entity.service.id)
            .subscribe(
                data => {
                    this.allEmployeService = [];
                    this.allEmployeService = data.employes
                },
                errorCode => this.statusCode = errorCode);
        console.error("controle employe" + JSON.stringify(this.allEmployeService))
        return this.allEmployeService;
    }

    getEmployeByOtherService(): Employe[] {
        this._emploiService.getEmployeByService(this.otherservice.id)
            .subscribe(
                data => {
                    this.allEmployeOtherService = [];
                    this.allEmployeOtherService = data.employes
                },
                errorCode => this.statusCode = errorCode);
        return this.allEmployeOtherService;
    }



    /*    ngOnDestroy() {
           this.routeData.unsubscribe();
       } */

    private onSaveSuccess(result, headers) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        // this.activeModal.dismiss(result.body);
        console.error("consolidation");
    }

    private onSaveError() {
        this.isSaving = false;
    }



    handleInputChange(e) {
        this.imageError = false;
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var reader = new FileReader();
        console.error("console image error" + file.type);
        if (!file.type.match('image/*')) {
            this.imageError = true;
            this.filename = "Le fichier " + file.name + " est invalide";
            this.myInputVariable.nativeElement.value = "";

            return;
        }

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        //  console.error("log binary"+ btoa(this.imageSrc));
    }

    resetUpload() {
        this.myInputVariable.nativeElement.value = "";
        this.imageSrc = null;
        this.filename = null;
        this.imageError = false;

    }

    onSubmit() {
        //   this.spinner.show();
        if (this.form.valid) {

            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));
            /*     if (new Date(this.entity.dateDeNaissance).getTime() < new Date(this.entity.dateEmbauche).getTime()) { */
            try {

                this.entity.idEmploiyeParent = this.singleSelect[0].id;
                //  this.entity.photo= atob(this.imageSrc);
                console.error(" Fichier  affichage top" + this.imageSrc);
                this.entity.photo = this.imageSrc;

                console.error("this.form.value=" + JSON.stringify(this.entity));
                this._emploiService.saveEmploye(this.entity).subscribe(
                    response => {

                        this.param.value = this.entity.nom + ' ' + this.entity.prenom;
                        this.msg = response.headers.get('x-annups-alert');
                        this.employeSuccess = true;
                        this.form.reset();
                        this.resetUpload();
                    },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.employeError = true;
                    }
                );

                console.log("form end submitted!");

            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
            /*   } else {
                  console.error("date de naissance inferieur à la date d'embauche");
              } */

        } else {
            console.log(" form not submited");
        }



    }


    listEmploye() {
        this.router.navigate([this.listRouteUrl]);
    }

}





import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
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
import { EmployeService } from '../../../../employe';
import { EmploiService } from '../../service/employe.service';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Fonction, Service } from '../../../../models';
import { Droit } from '../../../../models/droit';
import {
    LANGS
   } from '../../../../app.constants';   
import { TranslateService } from '@ngx-translate/core';
import { StateStorageService } from '../../../../shared';
//import { Principal, User, UserService} from '../../shared';
import * as moment from 'moment';

@Component({
    selector: 'app-home-admin-employe-update',
    templateUrl: './employe.update.component.html',
    styleUrls: ['./employe.update.component.css']
})
export class EmployeUpdateComponent implements OnInit {
    isCollapsedSearch: Boolean;
    employes: Employe[];
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    bsValue = new Date();
    colorTheme = 'theme-dark-blue';
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    search: any
    simpleSearch: boolean;
    advanceSearch: boolean;
    affichertout: boolean;
    id: any;
    entity: any;
    errors:any;
    listRouteUrl: string = "/admin/employe/list";
    bsConfig: Partial<BsDatepickerConfig>;
    allFonctions: Fonction[];
    allServices: Service[];
    allDroits: Droit[];
    allEmployeService: Employe[];
    allEmployeOtherService: Employe[];
    sex: any;
    fonction:any;
    obsEntity:any;
    msg: string;
    param = {value: ''};
    sexe: SelectItem[];
    statut: SelectItem[];
    langue: SelectItem[];
    singleSelect: any = [];
    statusCode: number;
    superior: boolean;
    other: boolean;
    otherservice: Service;
    @ViewChild('f') form: any;
    _langs: string;
    employeUpdateSuccess:boolean=false;
    employeUpdateError:boolean=false;

    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
       /*  private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager, */
        /* private router: Router,
     
        
        private employeService:EmployeService, */
        /* private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,*/
        private stateStorageService: StateStorageService,
        private router: Router, 
        private activatedRoute: ActivatedRoute,
      //  private employeService:EmploiService
      private translate: TranslateService,
        private _emploiService: EmploiService,

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

        this._langs=LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
           
    }

    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };
    ngOnInit() {

        this.id = this.activatedRoute.snapshot.params['id'];
        this._emploiService.getEmployeById(this.id).subscribe(
            (data) => {
                
                this.entity = data;
               // this.fonction=this.entity.fonction;
                console.error('droit par lain' + JSON.stringify(this.entity.authorities));
              //  this.form..setValue(this.entity.authorities);
                console.error("utc verification"+new Date(this.entity.dateDeNaissance));
                this.entity.dateDeNaissance= new Date(moment(this.entity.dateDeNaissance.toString()).format("YYYY-MM-DD"));
                this.entity.dateEmbauche= new Date(moment(this.entity.dateEmbauche.toString()).format("YYYY-MM-DD"));

                console.error('erreur de id' + JSON.stringify(this.entity));
            },
            err => {
                console.log('erreur de id' + JSON.stringify(err));
                this.errors = err.statuts;
            }
    
        ); 
        this.getAllFonction();
        this.getAllService();
        this.getAllDroit();
        this.initValues();
//this.bsConfig = Object.assign({}, { containerClass: this.colorTheme },{ dateInputFormat: 'DD-MM-YYYY'  });
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme },{ dateInputFormat: 'YYYY-MM-DD' });

  
      
    }





    initValues() {
        this.superior = true;
        this.other = false;
    }
   listEmploye(){
        this.router.navigate([this.listRouteUrl]);
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


    onUpdateSubmit() {
        //   this.spinner.show();
        if (this.form.valid) {

            console.log("form submitted!");
            console.error("this.form.value="+ JSON.stringify(this.entity));
        /*     if (new Date(this.entity.dateDeNaissance).getTime() < new Date(this.entity.dateEmbauche).getTime()) { */
                try {

                    this.entity.idEmploiyeParent = this.singleSelect[0].id;

            console.error("this.form.value update="+ JSON.stringify(this.entity));
            this._emploiService.updateEmploi(this.entity).subscribe(
                        response => {
                            this.msg = response.headers.get('x-annups-alert');
                            this.stateStorageService.storeMsg(this.msg);
                            console.error("this.form.value="+ JSON.stringify(this.entity));

                          this.employeUpdateSuccess=true;
                        //  this.router.navigate([this.listRouteUrl]);

                        },
                        error => {
                            this.msg = error.headers.get('x-annups-error');
                            this.employeUpdateError=true;
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

}



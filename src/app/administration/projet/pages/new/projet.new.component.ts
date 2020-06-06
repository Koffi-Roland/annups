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
    LANGS,
} from '../../../../app.constants';

import { SelectItem } from 'primeng/components/common/selectitem';
import { Employe } from '../../../../models/employe';

import { Fonction, Service, Projet } from '../../../../models';
import { Droit } from '../../../../models/droit';
//import { Principal, User, UserService} from '../../shared';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateFRParserFormatter } from '../../../../ngb-date-fr-parser-formatter';
import { ProjetService } from '../../../../projet';
import { ProjetsService } from '../../service/projets.service';
import { TranslateService } from '@ngx-translate/core';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { EmploiService } from '../../../employe/service/employe.service';
import { Principal } from '../../../../shared';

@Component({
    selector: 'app-home-admin-projet-new',
    templateUrl: './projet.new.component.html',
    styleUrls: ['./projet.new.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ProjetNewComponent implements OnInit/* , OnDestroy */ {

    isSaving: boolean;
    routeData: any;
    @ViewChild('f') form: any;
    entity: Projet = new Projet(null);
    projetSuccess: any;
    projetError: any;
    _langs: any;
    id: any;
    idEmploye: number;
    service: any;
    singleSelect: any = [];
    singleSponsor: any = [];
    allServices: Service[];
    allEmployes: any[];
    allSponsor: any[];
    allEmployesData: any[];
    statusCode: any;
    projetWithChef: boolean = false;
    simpleProjet: boolean = false;
    colorTheme = 'theme-dark-blue';
    listRouteUrl: string = "/admin/projet/list";
    viewAdmin: boolean;
    viewAdminProjet: boolean;
    droit: Droit;
    droits: Droit[];
    errors: any;
    account: any;
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };
    bsConfig: Partial<BsDatepickerConfig>;
    msg: any;
    constructor(
        private formatService: NgbDateFRParserFormatter,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private _emploiService: EmploiService,
        private projetService: ProjetsService,
        private translate: TranslateService,
        private principal: Principal


    ) {
        this.principal.identity().then((account) => {
            this.account = account;
        });


        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
    }


    ngOnInit() {
        this.initValues();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
        this._emploiService.getUserDroits(this.account.matricule)
            .subscribe(
                data => {
                    let d: any = data;
                    this.droits = d;

                    for (let auth of this.droits) {

                        if (auth.label === "ROLE_ADMIN") {
                            this.viewAdmin = true;
                            this.viewAdminProjet = false;

                            break;
                        }
                        else {
                            this.viewAdmin = false;
                            this.viewAdminProjet = true;
                        }

                    }
                },
                err => {
                    console.log('erreur de id' + JSON.stringify(err));
                    this.errors = err.statuts;
                }
            );

        this.getAllService();
        this.getAllEmployeService();
        this.getAllSponsor();
    }

    /*  ngOnDestroy() {
         this.routeData.unsubscribe();
     }
  */


    private onSaveSuccess(result) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        // this.isSaving = false;
        // this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }


    onSubmit() {
        if (this.form.valid) {

            console.log("form submitted!");
            try {
                this.entity.sponsor = this.singleSponsor[0];
                // this.entity.sponsor=this.singleSponsor[0];
               // console.error('entiyt+++' + JSON.stringify(this.entity));
                this.projetService.saveProjet(this.entity).subscribe(response => {
                    this.msg = response.headers.get('x-annups-alert');
                    this.projetSuccess = true;
                    this.form.reset();
                    //  this.singleSponsor=null;
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.projetError = true;
                    });

                console.log("form end submitted!");

            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }

        } else {
            console.log("form not submitted!");

        }


    }
    onChefProjetSubmit() {
        if (this.form.valid) {

            console.log("form submitted!");
            try {
                this.entity.employe = this.singleSelect[0];
                //  console.log('entiyt+++' + JSON.stringify(this.entity));
                this.entity.sponsor = this.singleSponsor[0];
                //console.error("je suis la"+);

                this.projetService.saveProjet(this.entity).subscribe(response => {
                    this.msg = response.headers.get('x-annups-alert');
                    this.projetSuccess = true;
                    this.form.reset();
                    //  this.singleSelect=null;
                    //  this.singleSponsor=null;                
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.projetError = true;
                        console.error("objet  " + this.projetError);

                    });

                console.log("form end submitted!");

            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }

        } else {
            console.log("form not submitted!");

        }

    }
    listProjets() {
        this.router.navigate([this.listRouteUrl]);
    }


    initValues() {
        this.simpleProjet = true;
        this.projetWithChef = false;
    }
    activeSimpleProjet() {
        this.simpleProjet = true;
        this.projetWithChef = false;
    }

    activeWithChefProjet() {
        this.simpleProjet = false;
        this.projetWithChef = true;
    }

    getAllEmployeService(): Employe[] {
        this.projetService.getAllEmployeService()
            .subscribe(
                data => this.allEmployesData = data,
                errorCode => this.statusCode = errorCode);
        console.error("employe  Service to days " + this.allEmployesData);
        return this.allEmployesData;
    }
    getAllService(): Service[] {
        this._emploiService.getAllService()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }


    getAllSponsor(): any[] {
        this.projetService.getSponsor()
            .subscribe(
                data => this.allSponsor = data,
                errorCode => this.statusCode = errorCode);
        console.error(" employe" + JSON.stringify(this.allSponsor))

        return this.allSponsor;
    }



    getEmployeByService(): Employe[] {
        this.projetService.getEmployeByService(this.service.id)
            .subscribe(
                data => {
                    this.allEmployes = data
                },
                errorCode => this.statusCode = errorCode);
        console.error("service" + this.service.id)
        console.error("controle employe" + JSON.stringify(this.allEmployes))
        return this.allEmployes;
    }

}





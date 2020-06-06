import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

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
    LANGS,
} from '../../../../app.constants';

import { ProjetsService } from '../../service/projets.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../../../ngb-date-fr-parser-formatter';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { StateStorageService } from '../../../../shared';
import { Observable } from 'rxjs';
import { Employe, Projet } from '../../../../models';
import * as moment from 'moment';

//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-projet-update',
    templateUrl: './projet.update.component.html',
    styleUrls: ['./projet.update.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ProjetUpdateComponent implements OnInit {
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
    reverse: any;
    search: any
    simpleSearch: boolean;
    advanceSearch: boolean;
    affichertout: boolean;
    projetError: boolean = false;
    id: any;
    _langs: any;
    entity: any;
    bsValue = new Date();
    errors: any;
    allSponsor: any[];
    allEmployesData: any[];
    statusCode: any;
    listRouteUrl: string = "/admin/projet/list";
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    msg: any;

    @ViewChild('f') form: any;

    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        /*  private parseLinks: JhiParseLinks,
         private eventManager: JhiEventManager, */
        /* private router: Router,
     
        
        private employeService:EmployeService, */
        /* private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,*/
        private router: Router,
        private stateStorageService: StateStorageService,
        private activatedRoute: ActivatedRoute,
        private projetService: ProjetsService,
        private translate: TranslateService

    ) {
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
    }


    ngOnInit() {
        this.id = this.activatedRoute.snapshot.params['id'];

           this.projetService.getProjetById(this.id).subscribe(
              (data) => {
  
                  this.entity = data;
  
                  console.error('erreur de id' + JSON.stringify(this.entity));
              },
              err => {
                  console.log('erreur de id' + JSON.stringify(err));
                  this.errors = err.statuts;
              }
  
          ); 
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'YYYY-MM-DD' });
        this.getAllSponsor();

    }



    listProjet() {
        this.router.navigate([this.listRouteUrl]);
    }
    onSubmit() {
        if (this.form.valid) {

            console.log("form submitted!");
            try {
               

                this.projetService.updateProjet(this.entity).subscribe(response => {
                    this.msg = response.headers.get('x-annups-alert');
                    this.stateStorageService.storeMsg(this.msg);
                    this.router.navigate([this.listRouteUrl]);
                    this.form.reset();
                    console.log("form end submitted!");
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        console.error("msg" + this.msg);
                        this.projetError = true;
                    }
                );



            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }

        } else {
            console.log("form not submitted!");

        }




    }

    getAllSponsor(): any[] {
        this.projetService.getSponsor()
            .subscribe(
                data => this.allSponsor = data,
                errorCode => this.statusCode = errorCode);
        console.error(" employe" + JSON.stringify(this.allSponsor))

        return this.allSponsor;
    }
}



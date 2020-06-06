import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, TemplateRef } from '@angular/core';
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
    LANGS,
} from '../../../../app.constants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ProjetsService } from '../../service/projets.service';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../../../ngb-date-fr-parser-formatter';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { EmploiService } from '../../../employe/service/employe.service';
import { Service } from '../../../../models';
import { Employe } from '../../../../models/employe';
import { Principal, StateStorageService } from '../../../../shared';
import { EmployeService } from '../../../../employe';
import { Droit } from '../../../../models/droit';
import { TranslateService } from '@ngx-translate/core';
import { Tache } from '../../../../models/tache';

import { formatDate } from '@angular/common';
import * as moment from 'moment';
//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-tache-projet',
    templateUrl: './projet.tache.component.html',
    styleUrls: ['./projet.tache.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }],
})
export class TacheComponent implements OnInit {
    isCollapsedSearch: Boolean;
    modalRef: BsModalRef;
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
    id: any;
    idEmploye: number;
    service: any;
    singleSelect: any = [];
    taches: any;
    tacheDto: any;
    progressSuccess: any;
    progressError: any;
    dateMaj:any;
    listRouteUrl: string = "/admin/projet/list";
    updateTacheUrl:string="/admin/projet/tache/update"
    @ViewChild('f') form: any;
    _langs: string;
    msg: any;
    showTab:boolean=false;
    showForm:boolean=false;
    errors:any;
    entity:any;
    progress: any;
    ts: any;
    maxDate: any;
    minDate:any;
    
    tacheUpdateDto:any;
    tache:  Tache = new Tache(null);
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };
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
        private activatedRoute: ActivatedRoute,
        private projetService: ProjetsService,
        private _employeService: EmploiService,
        private translate: TranslateService,
        private stateStorageService: StateStorageService,
        private principal: Principal,
        private modalService: BsModalService

    ) {
        this.ts = this.activatedRoute.snapshot.params['id'];
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
    }


    ngOnInit() {
        this.initValues();
        this.getTacheByProjet();
        this.projetService.getProjetById(this.ts).subscribe(
            (data) => {
                
                this.entity = data;
                this.maxDate= new Date(moment(this.entity.datefin.toString()).format("YYYY-MM-DD"));
               this.minDate= new Date(moment(this.entity.datedebut.toString()).format("YYYY-MM-DD"));
               console.error("verif"+this.maxDate);
                console.error('erreur de id' + JSON.stringify(this.entity));
            },
            err => {
                console.log('erreur de id projet affectation' + JSON.stringify(err));
                this.errors = err.statuts;
            }
    
        );
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'YYYY-MM-DD' });

    }

    getTacheByProjet(): void {
        this._employeService.getTacheByProjet(this.ts)
            .subscribe(
                (data) => {
                    let d: any = data;
                    this.taches = d.taches;
                    console.error('list taches' + JSON.stringify(this.taches));
                },
                err => {
                    console.log('erreur de id' + JSON.stringify(err));
                    // this.errors = err.statuts;
                }

            );


    }
    onSubmit() {
       
            if (this.form.valid) {
    
                try {
    
                  
                /*     this.tache.employe=this.tacheUpdateDto.employe_id;
                    this.tache.projet=this.tacheUpdateDto.projet_id;
                    this.tache.label=this.tacheUpdateDto.label;
                    this.tache.progression=this.tacheUpdateDto.progression;
                    this.tache.datedebut=this.tacheUpdateDto.dateDebut;
                    this.tache.datefin=this.tacheUpdateDto.dateFin; */
                    console.error('tache tdo' + JSON.stringify(this.tacheUpdateDto));
                    this.projetService.modifierTacheProjet(this.tacheUpdateDto).subscribe(response => {
                         this.msg = response.headers.get('x-annups-alert');
                         this.progressSuccess=true;
                        console.error("message" + this.msg);
                        this.initValues();
                        this.getTacheByProjet();

    
                      //  this.form.reset();
                       // this.router.navigate([this.listRouteUrl]);
    
                    },
                        error => {
                            this.msg = error.headers.get('x-annups-error');
                            this.progressError=true;
    
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
    initValues(){
        this.showTab=true;
        this.showForm=false;
    }
    listProjets() {
        this.router.navigate([this.listRouteUrl]);
    }
    updateTache(tache:any){
        if(tache){
            this.showForm=true;
            this.showTab=false;
            this.tacheUpdateDto=tache;
            this.tacheUpdateDto.dateFin= new Date(moment(this.tacheUpdateDto.dateFin.toString()).format("YYYY-MM-DD"));
            this.tacheUpdateDto.dateDebut= new Date(moment(this.tacheUpdateDto.dateDebut.toString()).format("YYYY-MM-DD"));
/*             this.router.navigate([this.updateTacheUrl,tache.id]);
 */        }
   

}

    openModal(template: TemplateRef<any>, tache: any) {
        this.progress = tache.progression;
        this.tacheDto = tache;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    confirm(): void {
       
            try {
this.dateMaj=this.tacheDto.date_maj;
                this.projetService.affecterNiveauTache(this.tacheDto.employe_id, this.tacheDto.projet_id,this.progress,this.dateMaj.toString()).subscribe(response => {
                    this.msg = response.headers.get('x-annups-alert');
                    console.error("msg"+this.msg);
                   // this.modalRef.hide();
                    this.progressSuccess = true;
                   // this.form.reset();
                    this.tacheDto = null;
                    this.decline();
                    this.getTacheByProjet();

                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.progressError = true;

                    });

                console.log("form end submitted!");

            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }

        }
    





    decline(): void {
        this.modalRef.hide();
    }
}



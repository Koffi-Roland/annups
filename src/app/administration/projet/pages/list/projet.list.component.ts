import { Component, OnInit, OnDestroy, ViewChild ,TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
import { NgxSpinnerService } from 'ngx-spinner';
import { StateStorageService } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import { BsModalService } from 'ngx-bootstrap';
@Component({
    selector: 'app-home-admin-projet-list',
    templateUrl: './projet.list.component.html',
    styleUrls: ['./projet.list.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ProjetListComponent implements OnInit/* , OnDestroy */ {

    isSaving: boolean;
    routeData: any;
    error: any;
    retirerSuccess: any;
    retirerError: any;
    success: any;
    projets: Projet[];
    modalRef: BsModalRef;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    projetId:any;
    reverse: any;
    affichertout:any;
    @ViewChild('f') form: any;
    entity: Projet = new Projet(null);
    updateRouteUrl: string = "/admin/projetupdate/";
    affectationRouteUrl: string = "/admin/projetaffectation/";
    changerprojetRouteUrl:string="/admin/projetchangerchef/";
    ajouterRouteUrl:string="/admin/ajoutertache/";
    projetnewRouteUrl:string="/admin/projet/new/";
    tacheRouteUrl:string="/admin/projet/tache/"
    projetSuccess:boolean=false;
    projetError:boolean=false;
    affecterProjetSuccess:boolean=false;
    msg:any;
    _langs: string;
    param = { value: '' };
    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
    };
    constructor(

        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private stateStorageService:StateStorageService,
        private spinner: NgxSpinnerService,
        private projetService: ProjetsService,
        private translate:TranslateService,
        private modalService: BsModalService


    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
        this.loadAll();
        this.msg=this.stateStorageService.getMsg();
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
    }


    ngOnInit() {
        this.loadAll();
        this.checkMesage();
        this.affichertout = false;

    }
    checkMesage(){
        this.stateStorageService.clearMsg();
        if(this.msg){
            this.projetSuccess=true;
            
        }
    }

    transition() {
        this.router.navigate(['/admin/projet/list'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
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
    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);

        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
    }
    private onSuccess(data, headers) {
        setTimeout(() => {
            this.spinner.hide();
        }, 1000);
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
          this.affichertout = false;
        console.log("liste de all projets +++++++++++ " + JSON.stringify(this.projets));
    }

    loadAll() {

        this.spinner.show();
        this.projetService.query({

            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()

        }).subscribe(

            (res: HttpResponse<Projet[]>) => this.onSuccess(res.body, res.headers),

            (res: HttpResponse<any>) => this.onError(res.body)
        );

    }

    private onSaveSuccess(result) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        // this.isSaving = false;
        // this.activeModal.dismiss(result.body);
    }

    private onSaveError() {
        this.isSaving = false;
    }



    updateProjet(id: any) {
        if (id) {
            this.router.navigate([this.updateRouteUrl, id]);
            console.error("updateCurrent in id = " + id);
        }

        // console.error("update id = " + id);
    }

    affecterProjet(id: any) {
        if (id) {
            this.router.navigate([this.affectationRouteUrl, id]);
            console.error("updateCurrent in id = " + id);
        }

        // console.error("update id = " + id);
    }
    validerProjet(id:any){
        if (id) {
            this.projetService.validerProjet(id).subscribe(response => {
                 this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess = true;
                console.error("msg"+this.msg);

                this.loadAll();
            },
                error => {
                     this.msg = error.headers.get('x-annups-error');
                     console.error("msg"+this.msg);

                    this.projetError = true;
                });
        }
    }

    cloturerProjet(id:any){
        if (id) {
            this.projetService.cloturerProjet(id).subscribe(response => {
                 this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess = true;

                this.loadAll();
            },
                error => {
                     this.msg = error.headers.get('x-annups-error');
                    this.projetError = true;
                });
        }
    }

    retirerProjet(id: any) {
        if (id) {
            this.projetService.retirerChefProjet(id).subscribe(response => {
                 this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess = true;

                this.loadAll();
            },
                error => {
                     this.msg = error.headers.get('x-annups-error');
                    this.projetError = true;
                });
        }
    }

    ajouterTache(id: any) {
        if (id) {
            this.router.navigate([this.ajouterRouteUrl, id]);
        }
    }
    voirTache(id: any) {
        if (id) {
            console.error("yessssssssssssss"+ this.tacheRouteUrl+" "+id);
            this.router.navigate([this.tacheRouteUrl, id]);
        }
    }
    changerChefProjet(id: any) {
        if (id) {
            this.router.navigate([this.changerprojetRouteUrl, id]);
        }
    }
    private onSuccessSimpleSearch(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        this.affichertout = true;
        console.log("liste de projets simpleSearch " + JSON.stringify(this.projets));
    }
    loadAllSimpleSearch(key: string) {
        if (key != null && key != '') {
            console.log('Donnée ' + key)
            this.projetService.searchProjet({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                key: key

            }).subscribe(
                (res: HttpResponse<Projet[]>) => this.onSuccessSimpleSearch(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
        }
    }

    onDelete(id:any){
        if(id){
    
            this.projetService.onDelete(id).subscribe(response => {
                   
                //  this.getAllServices();
                this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess=true;
                this.loadAll();
    
                console.error("message " + this.msg);
               // this.formUpdate.reset();
    
            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                  this.projetError=true;
    
                });
    
        }
    
    }
    onActiveProjet(id:any){
        if(id){
            this.projetService.onActiveProjet(id).subscribe(response => {
                   
                this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess=true;
                this.loadAll();
    
                console.error("message " + this.msg);
    
            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                  this.projetError=true;
    
                });
      
        }

    }
    
    ajouterProjet(){
        this.router.navigate([this.projetnewRouteUrl]);

    }


    openModal(template: TemplateRef<any>,id:any) {
        this.projetId=id;
        this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
      }

      decline(): void {
        this.modalRef.hide();
      }

    abandonnerProjet(){
        if(this.projetId){
    
            this.projetService.abandonnerProjet(this.projetId).subscribe(response => {
                //  this.getAllServices();
                this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess=true;
                this.loadAll();
                this.decline();
                console.error("message " + this.msg);
               // this.formUpdate.reset();
    
            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                  this.projetError=true;
    
                });
    
        }
    }
}





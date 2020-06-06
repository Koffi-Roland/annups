import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
//import { saveAs } from 'file-saver/dist/FileSaver';
import { saveAs } from '@progress/kendo-file-saver';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


import { SelectDropDownModule } from 'ngx-select-dropdown';



import { SelectItem } from 'primeng/components/common/selectitem';


import { NgxSpinnerService } from 'ngx-spinner'; 
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { CourierService } from '../courier.service';
import { ITEMS_PER_PAGE, LANGS } from '../../app.constants';
import { Courrier } from '../../models/courrier';
import { Principal } from '../../shared';
import { BsModalService } from 'ngx-bootstrap';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
    selector: 'app-home-courier-list',
    templateUrl: './courrier.component.html',
    styleUrls: ['./home.css']
})
export class CourrierHomeComponent implements OnInit/* , OnDestroy */ {
    error: any;
    modalRef: BsModalRef;
    traitement: any;
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
    courrierTraitement:any;
    allCourriers: any[];
    isSaving: boolean;
    msg:any;
    clotureSuccess:boolean=false;
    clotureError:boolean=false;
    errors: any;
    _langs:any;
    account:any;
    listRouteUrl: string = "/suiviecourrier/home";
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    isCollapsed: boolean = true;
    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
    };
    @ViewChild('envoie') form: any;
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
        private principal: Principal,

        private translate: TranslateService,
        private courrierService: CourierService,
        private modalService: BsModalService,


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
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };

    ngOnInit() {
        this.loadAll();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    openModalWithClass(template: TemplateRef<any>,courrier:any) {
        this.courrierTraitement=courrier;

        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
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


    getAllCourriers(): any[] {
        this.courrierService.getAllCourrier()
            .subscribe(
                data => {
                    this.allCourriers = data;

                },
                errorCode => {
                    setTimeout(() => {
                        this.spinner.hide();
                    }, 1000);
                    this.errors = errorCode;
                    //return [];
                });
        return this.allCourriers;
    }

    createCourrierToUpdate(t: any) {
        this.traitement = t;
        console.log(' ayyyyyyyyyyyyy ' + JSON.stringify(this.traitement));
    }

    envoiCourrier(e: NgForm) {
        
        this.traitement.avis = e.value.avis;
         if (e.value.avis != null || e.value.avis != null) { 
            this.courrierService.envoiCourrier(this.traitement)
                .subscribe(
                    response => {
                          console.log(' avis ' + JSON.stringify(this.traitement.avis));
                       // this.allCourriers = this.getAllCourriers();
                       this.msg = response.headers.get('x-annups-alert');
                       this.clotureSuccess=true;
                        this.loadAll();
                        this.traitement = null;
                        e.value.avis = null;
                    },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.clotureError=false;
                        setTimeout(() => {
                            this.spinner.hide();
                        }, 1000);
                        return [];
                    });
         } 
    }


    validerCourrier(courrier: any) {
        
 
            this.courrierService.envoiCourrier(courrier)
                .subscribe(
                    response => {
                        
                       // this.allCourriers = this.getAllCourriers();
                       this.msg = response.headers.get('x-annups-alert');
                       this.clotureSuccess=true;
                       console.error("message you 4598"+this.msg);
                        this.loadAll();

                    },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.clotureError=false;

                        setTimeout(() => {
                            this.spinner.hide();
                        }, 1000);
                        return [];
                    }
                        
                    
                    );
       
    }

    

    openCollapse() {
        this.isCollapsed = false;
    }

    closeCollapse() {
        this.isCollapsed = true;
    }
    courrier() {
        this.router.navigate(["/suiviecourrier/new"]);
    }
    download(courrier: any) {
        console.error("bon situation" + courrier.suiviCourier.fichierCourrier);
     

        let encodeBase = atob(courrier.suiviCourier.fichierCourrier);
     
        saveAs(encodeBase, courrier.suiviCourier.reference);

      
      

    }
    backToOrgan(){
        console.error("account id       "+this.account.id);
        if(this.account.id===null){
            this.router.navigate(["/employe"]); 
        }else{
            this.router.navigate(["/employe",this.account.id]);
        }
      

    }

}




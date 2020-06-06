import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../../shared';
import { JhiParseLinks } from 'ng-jhipster';
import { CongeService } from '../conge.service';
import { Conge } from '../../models/conge.model';
import { HttpResponse } from '@angular/common/http';
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../app.constants';
import * as moment from 'moment';
import {
    LANGS
} from '../../app.constants';
import { BsModalService, BsModalRef, BsDatepickerConfig } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
    selector: 'app-homeconge',
    templateUrl: './home.conge.component.html',
    styleUrls: ['home.conge.component.css']
})
export class HomeCongeComponent implements OnInit {
    navbartitle  = 'home conge' ;
    projet:string="/projet";
    organ:string="";
    conge:string="";
    account:any;
    dateDebut:any;
    dateFin:any;
    allconges:Conge[];
    _langs: string;
    error: any;
    success: any;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    isSaving: boolean;
    predicate: any;
    previousPage: any;
    detailsConge:any;
    reverse: any;
    search: any;
    modalRef: BsModalRef;
    bsConfig: Partial<BsDatepickerConfig>;
    colorTheme = 'theme-dark-blue';
isCollapsedSearch :boolean;

    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
    };
    affichertout:any;
    congeSuccess:boolean;
    msg:any;
    congeError:boolean;
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private principal: Principal,
        private storageService: StateStorageService,
        private congeService:CongeService,
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
    }
    ngOnInit() { 
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });

        this.navbartitle  = 'home conge' ;
        this.principal.identity().then((account) => {
            this.account = account;
          });
          this.loadAll();
          this.affichertout=false;
          this.isCollapsedSearch = true;

        
    }

    openModalWithClass(template: TemplateRef<any>,conge:any) {
        this.detailsConge=conge;

        this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
        );
      }

    
    loadAll() {
        this.spinner.show();  
        this.congeService.queryConge({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Conge[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }
    trackIdentity(index, item: Conge) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    onChange(){
        
    }
    valider(conge:any){
        if(conge){
            this.congeService.validerConge(conge.id).subscribe(response => {
                   
                this.msg = response.headers.get('x-annups-alert');
                this.congeSuccess=true;
                this.loadAll();
                console.error("message " + this.msg);
    
            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                  this.congeError=true;
    
                });
      
        } 
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.router.navigate(['/conge/home'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

  

    private onSuccess(data, headers) {
        setTimeout(() => {
            this.spinner.hide();
          }, 1000);
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.allconges = data;
          this.affichertout = false;
        console.log("liste  conge +++++++++++ " + JSON.stringify(this.allconges));
    }
    
    private onSuccessAdvanceSearch(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.allconges = data;
         this.affichertout = true;
        console.log("liste de projets simpleSearch " + JSON.stringify(this.allconges));
    }

    searchAdvancedConge(form: NgForm) {
        //         this.search = {
        //            "label": form.value.label, "nom": form.value.nom, "prenom": form.value.prenom,
        //            "datecreation": form.value.datecreation, "datedebut": form.value.datedebut, "datefin": form.value.datefin
        //        };
                this.search = {
                    "matricule": form.value.matricule, "datedebut": form.value.datedebut, "datefin": form.value.datefin,"etat": form.value.etat,
                };
                this.dateDebut = moment(this.search.datedebut).format("YYYY-MM-DD");
                this.dateFin = moment( this.search.datefin).format("YYYY-MM-DD");
                if (this.search.matricule != null || this.dateDebut != null || this.dateFin  != null || this.search.etat != null ) {
                    console.log('matricule ' + this.search.matricule)
                  
                    console.error("date debut"+this.dateDebut);
                    this.congeService.searchAdvancedConge(
                        this.search.matricule, this.dateDebut, this.dateFin,this.search.etat,
                        {
                            page: this.page - 1,
                            size: this.itemsPerPage,
                            sort: this.sort(),
                        }).subscribe(
                        (res: HttpResponse<Conge[]>) => this.onSuccessAdvanceSearch(res.body, res.headers),
                        (res: HttpResponse<any>) => this.onError(res.body)
                        );
                }
            }

    onClickModuleProjet(){
        this.router.navigate([this.projet]);
      
      }
      onClickModuleConge()
      {
        this.router.navigate([this.conge]);
      
      }
      onClickModuleOrgan()
      {
        this.router.navigate(['/employe/',this.account.id]);
      
      }
}
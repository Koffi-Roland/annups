import { Component, OnInit, OnDestroy, ViewChild ,TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
import { BsDatepickerConfig, BsModalService } from 'ngx-bootstrap';
import { EmploiService } from '../../../employe/service/employe.service';
import { Service, Projet } from '../../../../models';
import { Employe } from '../../../../models/employe';
import { Principal, StateStorageService } from '../../../../shared';
import { EmployeService } from '../../../../employe';
import { Droit } from '../../../../models/droit';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { EtatProjet } from '../../../../models/enum.projet';


//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-etat-projet',
    templateUrl: './projet.etat.component.html',
    styleUrls: ['./projet.etat.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ProjetParEtatComponent implements OnInit {

    isCollapsedSearch: Boolean;
    error: any;
    success: any;
    routeData: any;
    projetId:any;
    data: any;
    errors: any;
    _size: number = SIZE;
    _page: number = PAGE;
    totalPages: Number;
    totalElements: Number;
    modalRef: BsModalRef;
    searchs: string = null;
    maxSize = MAX_SIZE;
    currentPageNumber = CURRENT_PAGE_NUMBER;
    alertTimeout : number = TIMEOUT;
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
    msg: any;
    projetnewRouteUrl: string = "/admin/projet/new/";
    allEtats: SelectItem[];
    affecterProjetSuccess: boolean = false;
    affecterProjetError: boolean = false;
    etat: any;
    idEmploye: number;
    service: any;
    singleSelect: any = [];
    allServices: Service[];
    allEmployes: any[];
    allEmployesData: any[];
    statusCode: any;
    entity: any;
    projets: Projet[];
    account: any;
    _langs: any;
    bsValue = new Date();
    droit: Droit;
    droits: Droit[];

    updateRouteUrl: string = "/admin/projetupdate/";
    affectationRouteUrl: string = "/admin/projetaffectation/";
    changerprojetRouteUrl:string="/admin/projetchangerchef/";
    ajouterRouteUrl:string="/admin/ajoutertache/";
    tacheRouteUrl:string="/admin/projet/tache/"
    projetSuccess:boolean=false;
    projetError:boolean=false;

    contentArray:any;
    returnedArray:any;
    viewAdmin: boolean;
    viewAdminProjet: boolean;
    listRouteUrl: string = "/admin/projet/list";
    @ViewChild('f') form: any;
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
        private parseLinks: JhiParseLinks,
        private stateStorageService: StateStorageService,
        private router: Router,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private activatedRoute: ActivatedRoute,
        private projetService: ProjetsService,
        private _emploiService: EmploiService,
        private translate: TranslateService,
        private principal: Principal,
        private modalService: BsModalService


    ) {

      /*   this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
 */
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);

        this.allEtats = [
            { label: 'Terminer', value: EtatProjet.TERMINER },
            { label: 'En attente', value: EtatProjet.EN_ATTENTE },
            { label: 'Clôturer', value: EtatProjet.CLOTURER },
            { label: 'Abandonner', value: EtatProjet.ABANDONNER },
            { label: 'En cours', value: EtatProjet.ENCOURS },
            { label: 'Annuler', value: EtatProjet.ANNULER },
            { label: 'En retard', value: EtatProjet.EN_RETARD }

        ]
    }


    ngOnInit() {
        this.getProjetByEtat();
        //this.loadAll();
     /*    this.contentArray = this.contentArray.map((v: string, i: number) => `Content line ${i + 1}`);
        this.returnedArray = this.contentArray.slice(0, 10); */
    }


    getProjetByEtat() {
      
        this.projetService.getAllProjetByEtat(this.etat = (this.etat == null) ? EtatProjet.ENCOURS : this.etat,this._page, this._size).subscribe(
           
                data =>( this.projets = data,
                this.totalElements =Object.keys(data).length),
                errorCode => this.statusCode = errorCode);
                console.error("popoppo"+ this.projets.length);
               // this.totalElements = this.projets.length;
        return this.projets;
              // data = data
            /*   this.data = data;
              this.projets = this.data.content;
              this.totalElements = this.data.totalElements;
              console.log('oooooo ' + JSON.stringify( this.projets));
            }
            ,
            (err) => {
              this.errors = err;
            }); */
        
    }



    pageChanged(event: PageChangedEvent) {

        const _page = event.page - 1;
        const _size = event.itemsPerPage;
      
          this.projetService.getAllProjetByEtat(this.etat = (this.etat == null) ? EtatProjet.ENCOURS : this.etat,_page, _size).subscribe(
            data =>( this.projets = data,
                this.totalElements = Object.keys(data).length),
                errorCode => this.statusCode = errorCode);
        return this.projets;
        
    
      }





  /*   pageChanged(event: PageChangedEvent): void {
        const startItem = (event.page - 1) * event.itemsPerPage;
        const endItem = event.page * event.itemsPerPage;
        this.returnedArray = this.contentArray.slice(startItem, endItem);
      } */
    /*   getOnChangeProjetByEtat(){
          this.projetService.getAllProjetByEtat(this.etat)
          .subscribe(
              data => this.projets = data,
              errorCode => this.statusCode = errorCode);
      return this.projets;
      } */

    ajouterProjet() {
        this.router.navigate([this.projetnewRouteUrl]);

    }
  /*   transition() {
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
    } */

  /*   private onSuccess(data, headers) {
        setTimeout(() => {
        }, 1000);
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        console.log("liste de all projets +++++++++++ " + JSON.stringify(this.projets));
    } */
  /*   private onError(error) {
        //        this.alertService.error(error.error, error.message, null);

        setTimeout(() => {
            //   this.spinner.hide();
        }, 1000);
    } */
  /*   loadAll() {

        // this.spinner.show();
        this.projetService.query({

            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()

        }).subscribe(

            (res: HttpResponse<any[]>) => this.onSuccess(res.body, res.headers),

            (res: HttpResponse<any>) => this.onError(res.body)
        );


    } */

    initialiser() {
        this._size = SIZE;
        this._page = PAGE;
      }
      setPage(): void {
        this.currentPageNumber = CURRENT_PAGE_NUMBER;
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
                this.getProjetByEtat();


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
                this.getProjetByEtat();


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


    onDelete(id:any){
        if(id){
    
            this.projetService.onDelete(id).subscribe(response => {
                   
                //  this.getAllServices();
                this.msg = response.headers.get('x-annups-alert');
                this.projetSuccess=true;
               // this.loadAll();
               this.getProjetByEtat();
                console.error("message " + this.msg);
               // this.formUpdate.reset();
    
            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                  this.projetError=true;
    
                });
    
        }
    
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
                this.getProjetByEtat();

               // this.loadAll();
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



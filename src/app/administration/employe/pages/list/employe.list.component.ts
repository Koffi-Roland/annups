import {Component, OnInit, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
import {PaginationConfig} from '../../../../blocks/config/uib-pagination.config';
import { NgxSpinnerService } from 'ngx-spinner';
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
import { EmploiService } from '../../service/employe.service';
import { StateStorageService } from '../../../../shared';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
} from '../../../../app.constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { JourouvrableService } from '../../../configuration/service/jourouvrable.service';
import { Jour } from '../../../../models/jour.model';

//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-employe-list',
    templateUrl: './employe.list.component.html',
    styleUrls: ['./employe.list.component.css']
})
export class EmployeListComponent implements OnInit/* , OnDestroy */ {
    isCollapsedSearch: Boolean;
   employes: Employe[];
   employeSearchs: Employe[];
_employe:any;
   error: any;
   msg:any;
   success: any;
   routeData: any;
   links: any;
   modalRef: BsModalRef;
   totalItems: any;
   queryCount: any;
   password:any;
   itemsPerPage: any;
   page: any;
   predicate: any;
   previousPage: any;
   reverse: any;
   search: any
   affichertout: boolean;
   simpleSearch: boolean;
   advanceSearch: boolean;
   statusCode: number;
   listRouteUrl: string = "/admin/employe/list";
   newRouteUrl: string = "/admin/employenew";
   updateRouteUrl: string = "/admin/employeupdate/";
   _langs:string;
   activationSuccess:boolean;
   activationError:boolean;
   allConfig: Jour[];
   listJour = new Array<Jour>(); 
   employeDetails:any;
   param = { value: '' };
   @ViewChild('f') form: any;
   employeError:boolean=false;
   employeUpdateSuccess:boolean=false;
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
        private stateStorageService: StateStorageService,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private employeService: EmploiService,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private modalService: BsModalService,
        private jourouvrableService: JourouvrableService


       
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
        this.msg=this.stateStorageService.getMsg();
        
      
    }
    ngOnInit() {
        this.loadAll() ;
        this.checkMesage();
      //  this.getAllConfigGlobal();
       }

      checkMesage(){
          this.stateStorageService.clearMsg();
          if(this.msg){
              this.employeUpdateSuccess=true;
              
          }
      }
    
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    openModalWithClass(template: TemplateRef<any>,employe:any) {
        if(employe.congeGlobal){
            this.getAllConfigGlobal();
            this.employeDetails=employe;
            this.modalRef = this.modalService.show(
              template,
              Object.assign({}, { class: 'gray modal-lg' })
            );
            for(let i=0;i<this.allConfig.length; i++){
                this.listJour.push(this.allConfig[i]);
            }
     
        }else{

        }
       
      }


      onChangeJour(value: boolean,config:any) {
      

        for (let jour of this.listJour) {
           
              if (jour.label === config.label) {
                    jour.estOuvrable=value;
                break;
              } 

            }
 
       }
 







    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    getAllConfigGlobal(): Jour[] {
        this.jourouvrableService.getAllConfig()
            .subscribe(
                data => this.allConfig = data,
                errorCode => this.statusCode = errorCode);
        return this.allConfig;
    }

    onSubmit(){
        this.employeService.configCongeEmploye(this.employeDetails.id,this.listJour).subscribe(
            response => {
   
                this.param.value=this.employeDetails.nom+" "+this.employeDetails.prenom;

                this.msg = response.headers.get('x-annups-alert');
                console.error("msg"+this.msg);
               this.activationSuccess=true;
               this.loadAll();

               this.listJour = new Array();
               this.decline();

               console.error("trouver"+this.listJour);
            },
            error => {
                this.msg = error.headers.get('x-annups-error');
                console.error("msg"+this.msg);
   
                this.activationError=true;
            }
        ); 
    }
    onChange(value: boolean,employe:any) {
       /*  this.count++;
        this.change = value; */
      /*   console.error("salut les boolean"+value+"employe"+employe);
        console.log("employe +++++++++++ " + JSON.stringify(employe)); */

   

    this.employeService.EmployeActivation(employe.id,value).subscribe(
        response => {
            this.msg = response.headers.get('x-annups-alert');
            this.employeUpdateSuccess=true;

            this.loadAll();

        },
        error => {
            this.msg = error.headers.get('x-annups-error');
            this.employeError=true;
        }
    );
 
    console.log("form end submitted!");




      }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);

        setTimeout(() => {
            this.spinner.hide();
          }, 1000);
    }
    trackIdentity(index, item: Employe) {
        return item.id;
    }

    transition() {
        this.router.navigate(['/admin/employe/list'], {
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
        this.employes = data;
        //  this.affichertout = false;
        console.log("liste de all employe +++++++++++ " + JSON.stringify(this.employes));
    }

    loadAll() {
       
            this.spinner.show();  
        this.employeService.query({

            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
            
        }).subscribe(
            
            (res: HttpResponse<Employe[]>) => this.onSuccess(res.body, res.headers),

            (res: HttpResponse<any>) => this.onError(res.body)
        );
      
    }

    private onSuccessSimpleSearch(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.employes = data;
        this.affichertout = true;
        console.log("liste de employe simpleSearch " + JSON.stringify(this.employes));
    }
    loadAllSimpleSearch(key: string) {
        if (key != null && key != '') {
            console.log('Donnée ' + key)
            this.employeService.searchEmploye({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                key: key

            }).subscribe(
                (res: HttpResponse<Employe[]>) => this.onSuccessSimpleSearch(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
            );
        }
    }
  
    updateEmploye(id: any) {
        if (id) {
            this.router.navigate([this.updateRouteUrl, id]);
            console.error("updateCurrent in id = " + id);
        }

       // console.error("update id = " + id);
    }

    ajouterEmploye(){
        this.router.navigate([this.newRouteUrl]);
    }

    openModal(template: TemplateRef<any>, employe: any) {
       this._employe=employe;
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }


  confirm(): void {
      console.error("password"+this.password);
       
        try {
            this.employeService.initPassword(this.password, this._employe.id).subscribe(response => {
                this.param.value = this._employe.nom + ' ' + this._employe.prenom;
                this.msg = "Le mot de passe de l'employé "+this.param.value+" a été réinitialisé avec succès";
                console.error("msg"+this.msg);
                this.success = true;
                this._employe=null;
                this.password=null;
               //+ this.form.reset();
                this.decline();

            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    console.error("error message"+this.msg)
                    this.employeError = true;

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
    this.password=null;
}
}



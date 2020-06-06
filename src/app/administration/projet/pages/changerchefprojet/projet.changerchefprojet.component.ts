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
    LANGS,
} from '../../../../app.constants';

import { ProjetsService } from '../../service/projets.service';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../../../ngb-date-fr-parser-formatter';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { EmploiService } from '../../../employe/service/employe.service';
import { Service } from '../../../../models';
import { Employe } from '../../../../models/employe';
import { Principal, StateStorageService } from '../../../../shared';
import { EmployeService } from '../../../../employe';
import { Droit } from '../../../../models/droit';
import { TranslateService } from '@ngx-translate/core';


//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-changerchef-projet',
    templateUrl: './projet.changerchefprojet.component.html',
    styleUrls: ['./projet.changerchefprojet.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class ChangerChefProjetComponent implements OnInit {
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
    id: any;
    idEmploye:number;
    service:any;
    singleSelect: any = [];
    allServices:Service[];
    allEmployes:any[];
    allEmployesData:any[];
    statusCode:any;
    entity: any;
    account: any;
    bsValue = new Date();
    errors:any;
    droit: Droit;
    droits: Droit[];
    viewAdmin:boolean;
    viewAdminProjet:boolean;
    projetError:boolean=false;
    listRouteUrl: string = "/admin/projet/list";
    @ViewChild('f') form: any;
    _langs:string;
    msg:any;
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
        private _emploiService: EmploiService,
        private translate:TranslateService,
        private stateStorageService: StateStorageService,
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
      
          this.id = this.activatedRoute.snapshot.params['id'];
          this.projetService.getProjetById(this.id).subscribe(
             (data) => {
                 
                 this.entity = data;
               
                 console.error('erreur de id' + JSON.stringify(this.entity));
             },
             err => {
                 console.log('erreur de id projet affectation' + JSON.stringify(err));
                 this.errors = err.statuts;
             }
     
         );
          this._emploiService.getUserDroits(this.account.matricule)
          .subscribe(
            data => {
              let d: any = data;
              this.droits = d;
  
              for (let auth of this.droits) {
           
                if (auth.label === "ROLE_ADMIN") {
                  this.viewAdmin=true;
                  this.viewAdminProjet=false;

                  break;
                } 
                else {
                  this.viewAdmin=false;
                  this.viewAdminProjet=true;
                }
  
              }
            },
            err => {
              console.log('erreur de id' + JSON.stringify(err));
              this.errors = err.statuts;
            }
          );
      
     
  
          console.error("account"+this.account);
         // this.onCheckUser();

        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme },{ dateInputFormat: 'YYYY-MM-DD' });
        this.getAllService();
        this.getAllEmployeService();
        
     

    }


/* 
    onCheckUser() {
        if (this.account) {
        console.error(" je suis lal looooooo")
          this._emploiService.getUserDroits(this.account.matricule)
            .subscribe(
              data => {
                let d: any = data;
                this.droits = d;
    
                for (let auth of this.droits) {
             
                  if (auth.label === "ROLE_ADMIN") {
                    this.viewAdmin=true;
                    this.viewAdminProjet=false;

                    break;
                  } 
                  else {
                    this.viewAdmin=false;
                    this.viewAdminProjet=true;
                  }
    
                }
              },
              err => {
                console.log('erreur de id' + JSON.stringify(err));
                this.errors = err.statuts;
              }
            );
        }
        else {
            this.viewAdmin=false;
            this.viewAdminProjet=false;
        }
    
      } */







    getAllEmployeService(): Employe[] {
        this.projetService.getAllEmployeService()
            .subscribe(
                data => this.allEmployesData = data,
                errorCode => this.statusCode = errorCode);
                console.error("employe  Service to days "+this.allEmployesData);
        return this.allEmployesData;
    }
    getAllService(): Service[] {
        this._emploiService.getAllService()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }
    getEmployeByService(): Employe[] {
        this.projetService.getEmployeByService(this.service.id)
            .subscribe(
                data => {
                    this.allEmployes = data
                },
                errorCode => this.statusCode = errorCode);
                console.error("service"+this.service.id)
                console.error("controle employe"+ JSON.stringify(this.allEmployes))
        return this.allEmployes;
    }
   listProjet(){
        this.router.navigate([this.listRouteUrl]);
    }
    onSubmit() {
        if (this.form.valid) {
         
            try {

                this.projetService.changerChefProjet(this.singleSelect[0].id,this.entity.id).subscribe( response=> {
                    this.msg=response.headers.get('x-annups-alert');  
                    this.stateStorageService.storeMsg(this.msg);
                    console.error("change chef projet"+this.msg)
                    this.singleSelect=null;
                    this.router.navigate([this.listRouteUrl]);
                    this.form.reset();

                     },
                        error => {
                         this.msg=error.headers.get('x-annups-error');
                         console.error("change chef projet"+this.msg);
                         this.projetError=true;
    
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
}



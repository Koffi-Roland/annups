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
import { Principal } from '../../../../shared';
import { EmployeService } from '../../../../employe';
import { Droit } from '../../../../models/droit';
import { Tache } from '../../../../models/tache';
import { TranslateService } from '@ngx-translate/core';
import { formatDate } from '@angular/common';
import * as moment from 'moment';

//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-ajouter-tache',
    templateUrl: './projet.ajoutertache.component.html',
    styleUrls: ['./projet.ajoutertache.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class AjouterTacheComponent implements OnInit {
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
    datefin: any;
    datedebut: any;
    label: any;
    affichertout: boolean;
    id: any;
    idEmploye: number;
    service: any;
    singleSelect: any = [];
    allServices: Service[];
    allEmployes: any[];
    allEmployesData: any[];
    statusCode: any;
    entity: any;
    account: any;
    simpleTache: boolean;
    manyTache: boolean;
    bsValue = new Date();
    errors: any;
    droit: Droit;
    droits: Droit[];
    viewAdmin: boolean;
    viewAdminProjet: boolean;
    msg:any;
    addTaskError: boolean=false;

    addTask:boolean=false;
    tacheDtoSelected = new Array<Tache>();
    tacheDtoSelectedTempo = new Array<Tache>();
    listRouteUrl: string = "/admin/projet/list";
    @ViewChild('f') form: any;
    colorTheme = 'theme-dark-blue';
    _langs:string;
    bsConfig: Partial<BsDatepickerConfig>;
    config = {
        displayKey: "employe", //if objects array passed which key to be displayed defaults to description
        search: true,
    };
    dateFinProjet: any;
    dateDebutProjet: any;
    maxDate: any;
    minDate:any;
    tacheDto: Tache = new Tache(null);

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
        this.id = this.activatedRoute.snapshot.params['id'];
        this.projetService.getProjetById(this.id).subscribe(
            (data) => {

                this.entity = data;
                /* this.maxDate = this.entity.datefin.toString(); 
                console.error("heroooo"+this.maxDate); */
               this.maxDate= new Date(moment(this.entity.datefin.toString()).format("YYYY-MM-DD"));
               this.minDate= new Date(moment(this.entity.datedebut.toString()).format("YYYY-MM-DD"));



              /*  console.error("ok okoko  "+ok); */
              /*   var date = this.maxDate; // had to remove the colon (:) after the T in order to make it work
                var day = date.getDate();
                console.error("jourrrrrrrrrrrrr"+day);
                var monthIndex = date.getMonth();
                console.error("month"+monthIndex);

                var year = date.getFullYear();
                console.error("year"+year);

                var minutes = date.getMinutes();
                var hours = date.getHours();
                var seconds = date.getSeconds(); */


               /*  let month=this.maxDate.getMonth();
                 console.error("lksdlksdflksdfqlksdflksdf "+month);*/
               // this.maxDate = this.entity.datefin;

                //  this.dateFinProjet.setDate(this.dateFinProjet.getDate());
                console.error("date" + this.maxDate);

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



        console.error("account" + this.account);
        // this.onCheckUser();

        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
        this.getAllService();
        this.getAllEmployeService(); 



    }

    initValues() {
        this.simpleTache = true;
        this.manyTache = false;
    }
    activeSimpleTache() {
        this.simpleTache = true;
        this.manyTache = false;
    }

    activeManyTache() {
        this.simpleTache = false;
        this.manyTache = true;
    }

    createDate(date:any):any{
    //  val  month  = date

    //  new Date(this.maxDate);
    }
  /*   keyupDateFin(datefin:any){

        if(new Date(datefin).getTime() > new Date(this.maxDate).getTime() ){
            document.getElementById('datefin').className="controle-border";
        }
    }
   
    keyupDateDebut(event:any){
        console.error("okokoko"+new Date(event.target.value).getTime());

        if( new Date(event.target.value).getTime()  < new Date(this.minDate).getTime() ){
            console.error("okokoko");
            document.getElementById('datedebut').style.borderColor="red";
        }
    } */

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
    listProjet() {
        this.router.navigate([this.listRouteUrl]);
    }
    onOneSubmit() {
        if (this.form.valid) {

            try {

                this.tacheDto.projet = this.entity;
                this.tacheDto.employe = this.singleSelect[0];
                console.error("controle employe" + JSON.stringify(this.singleSelect[0]));

                console.error("controle tache" + JSON.stringify(this.tacheDto));

                this.projetService.ajouterTacheProjet(this.tacheDto).subscribe(response => {
                     this.msg = response.headers.get('x-annups-alert');
                     this.addTask=true;
                    console.error("message" + this.msg);

                    this.form.reset();
                   // this.router.navigate([this.listRouteUrl]);

                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.addTaskError=true;

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





    addInboard() {
        if (this.form.valid) {

            this.tacheDto.projet = this.entity;
            this.tacheDto.employe = this.singleSelect[0];
            console.error("controle tache" + JSON.stringify(this.tacheDto));
            this.tacheDtoSelected.push(this.tacheDto);
            console.error("controle employe tache" + JSON.stringify(this.tacheDtoSelected));
            this.tacheDtoSelectedTempo.push(this.tacheDto);
            this.tacheDto = new Tache(null);
          //  this.singleSelect = null;
            this.service = null;
            this.getAllService();
            this.getAllEmployeService();


        } else {
            console.log("form not submitted!");

        }
    }

    onDelete(tache: any) {
        console.error("helooo yeah");
        if (this.tacheDtoSelectedTempo.length >= 0) {
            //console.error("lenght"+this.serviceSelectedTempo.length);

            for (let i = 0; i < this.tacheDtoSelectedTempo.length; i++) {

                // console.error("formulaire active"+ JSON.stringify(sel));
                if (tache == this.tacheDtoSelectedTempo[i]) {
                    this.tacheDtoSelected.splice(i, 1);
                    this.tacheDtoSelectedTempo.splice(i, 1);
                }
                console.error("formulaire dto" + "i " + i + " " + JSON.stringify(this.tacheDtoSelected[i]));

                // this.serviceSelected[i].service.datePrevisionnelTraitement;
                // console.error("affichage loooo"+ this.serviceSelectedTempo[i]);
            }



        }
    }
    onManySubmit() {
        if (this.tacheDtoSelectedTempo.length >= 0) {
        try {

            this.projetService.ajouterManyTacheProjet(this.tacheDtoSelectedTempo).subscribe(response => {
                this.msg = response.headers.get('x-annups-alert');
                this.addTask=true;
                console.error("message" + this.msg);
                this.tacheDtoSelected = new Array<Tache>();
                this.tacheDtoSelectedTempo = new Array<Tache>();
                this.form.reset();
               // this.router.navigate([this.listRouteUrl]);

            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    this.addTaskError=true;
                });

            console.log("form end submitted!");

        }
        catch (error) {
            console.log("exception e = " + error);
            console.log(" form end exeception");
        }


        console.log("form end submitted!");
    }

}

}



import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Projet } from '../../models/';
import { NgForm } from '@angular/forms';
import { EmployeService } from '../employe.service';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { Principal, } from '../../shared';
import { LoginService } from '../../login';

import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../app.constants';
import { ProjetService } from '../../projet';
//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-modal-detail',
    templateUrl: './detail.component.html'


})
export class DetailComponent implements OnInit {
    isCollapsedSearch: Boolean;
    projets: Projet[];

    isNavbarCollapsed: boolean = false;
    //    languages: any[];
    //    swaggerEnabled: boolean;
    //    modalRef: NgbModalRef;
    //    version: string;
    account: Account;
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
    errors: any;
    taches: any;
    search: any;
    affichertout: boolean;
    simpleSearch: boolean;
    advanceSearch: boolean;
    size: any;
    ts: any;

  
    //    ngOnDestroy() {
    //        this.routeData.unsubscribe();
    //    }
    constructor(

        private employeService: EmployeService,
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private router: Router,
        private principal: Principal,
        private loginService: LoginService,
        private _activatedRoute: ActivatedRoute,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private projetService: ProjetService,

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.routeData = this._activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });

    }
    ngOnInit() {
        this.ts = this._activatedRoute.snapshot.params['id'];
        this.isCollapsedSearch = true;
        this.getProjetByEmploye(this.ts);
        // this.activeSearch();
        /*    this.loadAll();
           this.registerChangeInProjets(); */
        // this.activeSearch();
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        //        this.modalRef = this.loginModalService.open();
        this.router.navigate(['/login']);
    }
    goHome() {
        if (this.principal.isAuthenticated()) {
            this.router.navigate(['admin/home']);
        } else {
            this.router.navigate(['']);
        }

    }

    logout() {
        //        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
    getInfo() {
        return this.isAuthenticated() ? this.principal.getInfos() : null;
    }
    goToUserProfile() {
        this.router.navigate(['admin/updateprofil']);
    }

    getTacheByProjet(id: any): void {
        this.employeService.getTacheByProjet(id)
            .subscribe(
                (data) => {
                    let d: any = data;
                    this.taches = d.taches;
                    console.log('listFils' + JSON.stringify(this.taches));
                },
                err => {
                    console.log('erreur de id' + JSON.stringify(err));
                    // this.errors = err.statuts;
                }

            );
    }
    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }
    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    /*  activeSearch() {
          this.simpleSearch = true;
          this.advanceSearch = false;
      }

      activeAdvanceSearch() {
          this.simpleSearch = false;
          this.advanceSearch = true;
      }*/

    // recherche simple
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


    getProjetByEmploye(employe: any) {
        if (employe != null && employe !== '') {
            console.log('Donnée ' + employe)
            this.employeService.getProjetByEmploye2(employe, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            }).subscribe(
                (res: HttpResponse<Projet[]>) => this.onSuccessSimpleSearch2(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)

            );
        }
    }


    loadAll() {
        this.projetService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Projet[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }



    private onSuccessSimpleSearch2(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        console.log("liste de projets simpleSearch " + JSON.stringify(this.projets));
    }




    // recherche avancée
    loadAdvancedSearch(form: NgForm) {
        //         this.search = {
        //            "label": form.value.label, "nom": form.value.nom, "prenom": form.value.prenom,
        //            "datecreation": form.value.datecreation, "datedebut": form.value.datedebut, "datefin": form.value.datefin
        //        };
        this.search = {
            "label": form.value.label, "nom": form.value.nom, "prenom": form.value.prenom,
        };
        if (this.search.label != null || this.search.nom != null || this.search.prenom != null || this.search.datedebut != null || this.search.datefin != null || this.search.datecreation != null) {
            console.log('kikik ' + this.search.nom)
            this.projetService.searchAdvancedProjet(
                this.search.label, this.search.nom, this.search.prenom,
                {
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort(),
                }).subscribe(
                    (res: HttpResponse<Projet[]>) => this.onSuccessAdvanceSearch(res.body, res.headers),
                    (res: HttpResponse<any>) => this.onError(res.body)
                );
        }
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        this.affichertout = false;
        console.log("liste de projets +++++++++++ " + JSON.stringify(this.projets));
    }

    private onSuccessSimpleSearch(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        this.affichertout = true;
        console.log("liste de projets simpleSearch " + JSON.stringify(this.projets));
    }

    private onSuccessAdvanceSearch(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.projets = data;
        this.affichertout = true;
        console.log("liste de projets simpleSearch " + JSON.stringify(this.projets));
    }

    onClickProjet(id: any) {
        //console.log(' +++++++ employe' + JSON.stringify(employe));
        // console.log('begin ' + this._activatedRoute.snapshot.data['title']);
        // this._activatedRoute.snapshot.data['send'] = employe;
        this.getTacheByProjet(id);
        //this.router.navigate(['projet-detail', projet]);
        //console.log(' final ' + this._activatedRoute.snapshot.data['title']);
    }

    employeBack() {
        this.router.navigate(['employe', this.ts]);
    }
}

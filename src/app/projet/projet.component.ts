import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Projet} from '../models/';
import {ProjetService} from './projet.service';
import {JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil} from 'ng-jhipster';
import {HttpResponse} from '@angular/common/http';
import {PaginationConfig} from '../blocks/config/uib-pagination.config';
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../app.constants';
//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-projet-detail',
    templateUrl: './projet.component.html',
    styleUrls: ['./projet.css']
})
export class ProjetComponent implements OnInit, OnDestroy {
    isCollapsedSearch: Boolean;
    projets: Projet[];

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
    affichertout : boolean;
    ngOnInit() {
        //        this.principal.identity().then((account) => {
        //            this.currentAccount = account;
        //            this.loadAll();
        //            this.registerChangeInUsers();
        //        });
        this.affichertout = false;
        this.isCollapsedSearch = true;
        this.loadAll();
        this.registerChangeInProjets();
        this.activeSearch();
    }
    ngOnDestroy() {
        this.routeData.unsubscribe();
    }
    constructor(
        private projetService: ProjetService,
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,

    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }

    registerChangeInProjets() {
        this.eventManager.subscribe('projetListModification', (response) => this.loadAll());
    }
    /* registerChangeInProjets2() {
       this.eventManager.subscribe('projetListModification', (response) => this.loadAllSimpleSearch(key));
     }*/
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
    loadAllSimpleSearch(key: string) {
        if (key != null && key != '') {
            console.log('kikik ' + key)
            this.projetService.searchProjet({

                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                key: key.toUpperCase(),
            }).subscribe(
                (res: HttpResponse<Projet[]>) => this.onSuccessSimpleSearch(res.body, res.headers),
                (res: HttpResponse<any>) => this.onError(res.body)
                );
        }
    }
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




    trackIdentity(index, item: Projet) {
        return item.id;
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

    transition() {
        this.router.navigate(['/projet'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
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

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }

    activeSearch() {
        this.simpleSearch = true;
        this.advanceSearch = false;
    }
    activeAdvanceSearch() {
        this.simpleSearch = false;
        this.advanceSearch = true;
    }

    onClickRow(projet: Projet) {
        console.log(' +++++++ employe' + JSON.stringify(projet));
        console.log('begin ' + this.activatedRoute.snapshot.data['title']);
        // this._activatedRoute.snapshot.data['send'] = employe;
        this.router.navigate(['projet', projet.id]);
        console.log(' final ' + this.activatedRoute.snapshot.data['title']);
    }

}



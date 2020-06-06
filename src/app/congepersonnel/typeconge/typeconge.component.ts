import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { TypeConge } from '../../models/typeconge.model';
import {
    LANGS
} from '../../app.constants';
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../app.constants';
import { CongeService } from '../conge.service';
import { HttpResponse } from '@angular/common/http';
import { JhiParseLinks } from 'ng-jhipster';
@Component({
    selector: 'app-typeconge',
    templateUrl: './typeconge.component.html',
    styleUrls: ['typeconge.component.css']
})
export class TypeCongeComponent implements OnInit {
    navbartitle = 'home conge';
    projet: string = "/projet";
    organ: string = "";
    conge: string = "";
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
    reverse: any;
    search: any;
    new: boolean = true;
    update: boolean = false;
    typecongeSuccess: boolean;
    typecongeError: boolean;
    allTypeconges: TypeConge[];
    param = { value: '' };
    @ViewChild('f') form: any;
    msg: any;
    updateEntity: any;
    entity: TypeConge = new TypeConge(null);
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private congeService: CongeService


    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        //translate.setDefaultLang('fr');
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });
    }
    ngOnInit() {
        this.navbartitle = 'home conge';
        this.loadAll();
        this.new = true;
        this.update = false;
    }


    loadAll() {
        this.congeService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<TypeConge[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }
    trackIdentity(index, item: TypeConge) {
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
        this.router.navigate(['/conge/typeconge'], {
            queryParams: {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    updateTypeConge(type: any) {
        // console.error("id selectionner"+id);
        console.log("service" + JSON.stringify(type));
        /*update state*/
        this.new = false;
        this.update = true;
        this.updateEntity = type;


    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.allTypeconges = data;
        //  this.affichertout = false;
        console.log("liste de all type conge +++++++++++ " + JSON.stringify(this.allTypeconges));
    }
    /*   private onSaveSuccess(result) {
          //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
          this.isSaving = false;
          // this.activeModal.dismiss(result.body);
           console.error("message999999999"+result.headers.get('X-Token'));
      } */
    /*   getAllFonction(): Fonction[] {
          this.congeService.getAllFonction()
              .subscribe(
                  data => this.allTypeconges = data,
                  errorCode => this.statusCode = errorCode);
          return this.allTypeconges;
      } */
    private onSaveError() {
        this.isSaving = false;
    }
    delete(id: any) {
        if (id) {
            this.congeService.onDelete(id).subscribe(response => {

                //  this.getAllServices();
                this.typecongeSuccess = true;
                this.msg = response.headers.get('x-annups-alert');
                this.loadAll();

                console.error("message " + this.msg);
                // this.formUpdate.reset();

            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    console.error("msg"+this.msg);


                });

        }

    }
    add() {
        this.new = true;
        this.update = false;
        this.entity = new TypeConge(null);

    }
    onUpdate() {

        if (this.form.valid) {
            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));

            try {
                this.congeService.updateTypeConge(this.updateEntity).subscribe(response => {
                    this.param.value = this.entity.label;
                    this.msg = response.headers.get('x-annups-alert');
                    console.error("msg"+this.msg);
                    this.new = true;
                    this.update = false;
                    this.loadAll();
                    this.typecongeSuccess = true;
                    this.form.reset();
                    //  this.getAllServices();
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.typecongeError = true;
                        console.error("msg"+this.msg);
                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }


    }

    onSubmit() {
        if (this.form.valid) {


            this.congeService.saveTypeConge(this.entity).subscribe(
                response => {
                    this.param.value = this.entity.label;
                    this.msg = response.headers.get('x-annups-alert');
                    console.error("msg"+this.msg);
                    // console.error("message 9"+response.headers.get('x-annups-alert')); 
                    this.loadAll();
                    this.typecongeSuccess = true;
                    this.form.reset();
                    // this.loadAll();

                    console.error("ok");
                },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    this.typecongeError = true;
                    console.error("msg"+this.msg);
                    /*  console.error("message de error"+res); */

                });
            // console.log("message999999999"+response.headers.get('X-Token'));

            // this.getAllFonction();  

        } else {
            console.log("Form not Submitted!");
            //            this.ngOnInit();
        }

    }

}
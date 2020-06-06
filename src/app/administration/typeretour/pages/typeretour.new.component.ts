import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../blocks/config/uib-pagination.config';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
   } from '../../../app.constants';  
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../../app.constants';
import { Observable } from 'rxjs';
import { TypeRetour } from '../../../models/typeretour';
import { TypeRetourService } from '../service/typeretour.service';


//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-typeretour-new',
    templateUrl: './typeretour.new.component.html',
    styleUrls: ['./typeretour.new.component.css']
})
export class TypeRetourNewComponent implements OnInit/* , OnDestroy  */ {
    _langs: string;
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
    search: any ;
    affichertout: boolean;
    typeretour: any;
    allTyperetour:TypeRetour[];
    typeretourSuccess:any;
    typeretourDeleteSuccess:any;
    typeretourUpdateSuccess:any;
    typeretourUpdateError:any;

    typeretourError:any;
    obsEntity: any;
    isSaving: Boolean;
    newForm: FormGroup;
    updateForm: FormGroup;
    id: FormControl;
    label: FormControl;
    statusCode: number;
    new: boolean = true;
    update: boolean = false;
    msg:any;
    param = {value: ''};
    entity: TypeRetour = new TypeRetour(null);
    updateEntity:any;
    @ViewChild('f') form: any;
/*     @ViewChild('form') formUpdate: any;
 */    constructor(

        private activatedRoute: ActivatedRoute,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private router: Router,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private translate: TranslateService,
        private typeretourService:TypeRetourService
    ) {

        this.itemsPerPage = ITEMS_PER_PAGE;
        //translate.setDefaultLang('fr');
        this._langs=LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs); 
        this.routeData = this.activatedRoute.data.subscribe((data) => {
            this.page = data['pagingParams'].page;
            this.previousPage = data['pagingParams'].page;
            this.reverse = data['pagingParams'].ascending;
            this.predicate = data['pagingParams'].predicate;
        });

    }
    /*   registerChangeInFonction() {
          this.eventManager.subscribe('fonction', (response) => this.loadAll());
      }
   */
    ngOnInit() {
       // this.getAllTyperetour();
        //  this.getAllFonction();
        //  this.affichertout = false;
        /*  this. registerChangeInFonction() ; */
        this.loadAll();

        this.new = true;
        this.update = false;
    }

    loadAll() {
        this.typeretourService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<TypeRetour[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }
    trackIdentity(index, item: TypeRetour) {
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
        this.router.navigate(['/admin/typeretour/new'], {
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
        this.allTyperetour = data;
        this.affichertout = false;
        console.error("liste de all typeretour +++++++++++ " + JSON.stringify(this.allTyperetour));

    }
   
  /*   getAllTyperetour(): TypeRetour[] {
        this.typeretourService.getAllTyperetour()
            .subscribe(
                data => this.allTyperetour = data,
                errorCode => this.statusCode = errorCode);
   //console.error("liste de all typeretour +++++++++++ " + JSON.stringify(this.allTyperetour));

        return this.allTyperetour;
    } */
    private onSaveError() {
        this.isSaving = false;
    }




    updateTyperetour(typeretour: any) {
        // console.error("id selectionner"+id);
        console.log("service" + JSON.stringify(typeretour));
        /*update state*/
        this.new = false;
        this.update = true;
        this.updateEntity = typeretour;
    

    }

    onUpdate() {
      
        if(this.form.valid){
            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));

            try {
                this.typeretourService.updateTyperetour(this.updateEntity).subscribe(response => {
                    this.param.value=this.entity.label;
                    this.msg = response.headers.get('x-annups-alert');

                    this.new = true;
                    this.update = false;
                    this.loadAll();
                    this.typeretourUpdateSuccess=true;
                    this.form.reset();
                    //  this.getAllServices();
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.typeretourError=true;
                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }


    }

    addTyperetour(){
        this.new = true;
        this.update = false;
        this.entity = new TypeRetour(null);

    }

    onSubmit() {
        if (this.form.valid) {


            this.typeretourService.saveTyperetour(this.entity).subscribe(
                response => {
                    this.param.value=this.entity.label;
                     this.msg = response.headers.get('x-annups-alert');
                    console.error("message fonction"+this.msg);
                     // console.error("message 9"+response.headers.get('x-annups-alert')); 
                    this.loadAll();
                    this.typeretourSuccess=true;
                    this.form.reset();

                },
                error => {
                     this.msg = error.headers.get('x-annups-error');
                     this.typeretourError=true;
                      console.error("message de error"+this.msg); 

                });
            // console.log("message999999999"+response.headers.get('X-Token'));

            // this.getAllFonction();  

        } else {
            console.log("Form not Submitted!");
            //            this.ngOnInit();
        }

    }

 onDelete(id:any){
    if(id){

        this.typeretourService.onDelete(id).subscribe(response => {
               
            //  this.getAllServices();
            this.typeretourDeleteSuccess=true;
            this.msg = response.headers.get('x-annups-alert');
            this.loadAll();

            console.error("message " + this.msg);
           // this.formUpdate.reset();

        },
            error => {
                this.msg = error.headers.get('x-annups-error');
                this.typeretourError=true;


            });

    } 

}

}



import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbDateStruct, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { PaginationConfig } from '../../../../blocks/config/uib-pagination.config';
import { TranslateService } from '@ngx-translate/core';
import {
    LANGS
   } from '../../../../app.constants';  
import {
    ITEMS_PER_PAGE,
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE,
    TIMEOUT,
} from '../../../../app.constants';
import { Fonction } from '../../../../models';
import { FonctionService } from '../../service/fonction.service';
import { Observable } from 'rxjs';


//import { Principal, User, UserService} from '../../shared';
@Component({
    selector: 'app-home-admin-fonction-new',
    templateUrl: './fonction.new.component.html',
    styleUrls: ['./fonction.new.component.css']
})
export class FonctionNewComponent implements OnInit/* , OnDestroy  */ {
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
    fonction: any;
    fonctionSuccess:any;
    fonctionDeleteSuccess:any;
    fonctionUpdateSuccess:any;
    fonctionUpdateError:any;

    fonctionError:any;
    takeUpdateFonction: Fonction;
    obsEntity: any;
    isSaving: Boolean;
    newForm: FormGroup;
    updateForm: FormGroup;
    id: FormControl;
    label: FormControl;
    allFonctions: Fonction[];
    statusCode: number;
    new: boolean = true;
    update: boolean = false;
    msg:any;
    param = {value: ''};
    entity: Fonction = new Fonction(null);
    updateEntity:any;
    @ViewChild('f') form: any;
/*     @ViewChild('form') formUpdate: any;
 */    constructor(

        private activatedRoute: ActivatedRoute,
        private fonctionService: FonctionService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private router: Router,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private translate: TranslateService,
    ) {

        this.itemsPerPage = ITEMS_PER_PAGE;
        //translate.setDefaultLang('fr');
        this._langs=LANGS;
        translate.setDefaultLang(this._langs);
        console.error('errotf ' +this._langs);
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

        //  this.getAllFonction();
        //  this.affichertout = false;
        /*  this. registerChangeInFonction() ; */
        this.loadAll();

        this.new = true;
        this.update = false;
    }





    /* do(fonction:any,modal){
    
        this.fonction=fonction;
        this.modalService.open(modal);
        console.log("modal bootsrap");
    }
     */
    /*  ngOnDestroy() {
         this.routeData.unsubscribe();
     }
  */

    loadAll() {
        this.fonctionService.query({
            page: this.page - 1,
            size: this.itemsPerPage,
            sort: this.sort()
        }).subscribe(
            (res: HttpResponse<Fonction[]>) => this.onSuccess(res.body, res.headers),
            (res: HttpResponse<any>) => this.onError(res.body)
        );
    }

    private onError(error) {
        //        this.alertService.error(error.error, error.message, null);
    }
    trackIdentity(index, item: Fonction) {
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
        this.router.navigate(['/admin/fonction/new'], {
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
        this.allFonctions = data;
        //  this.affichertout = false;
        console.log("liste de all fonctions +++++++++++ " + JSON.stringify(this.allFonctions));
    }
    /*   private onSaveSuccess(result) {
          //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
          this.isSaving = false;
          // this.activeModal.dismiss(result.body);
           console.error("message999999999"+result.headers.get('X-Token'));
      } */
    getAllFonction(): Fonction[] {
        this.fonctionService.getAllFonction()
            .subscribe(
                data => this.allFonctions = data,
                errorCode => this.statusCode = errorCode);
        return this.allFonctions;
    }
    private onSaveError() {
        this.isSaving = false;
    }




    updateFonction(fonction: any) {
        // console.error("id selectionner"+id);
        console.log("service" + JSON.stringify(fonction));
        /*update state*/
        this.new = false;
        this.update = true;
        this.updateEntity = fonction;
    

    }

    onUpdate() {
      
        if(this.form.valid){
            console.log("form submitted!");
            //console.log("this.form.value="+ JSON.stringify(this.entity));

            try {
                this.fonctionService.updateFonction(this.updateEntity).subscribe(response => {
                    this.param.value=this.entity.label;
                    this.msg = response.headers.get('x-annups-alert');

                    this.new = true;
                    this.update = false;
                    this.loadAll();
                    this.fonctionUpdateSuccess=true;
                    this.form.reset();
                    //  this.getAllServices();
                },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.fonctionError=true;
                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }


    }

    addFonction(){
        this.new = true;
        this.update = false;
        this.entity = new Fonction(null);

    }

    onSubmit() {
        if (this.form.valid) {


            this.fonctionService.saveFonction(this.entity).subscribe(
                response => {
                    this.param.value=this.entity.label;
                     this.msg = response.headers.get('x-annups-alert');
                    console.error("message fonction"+this.msg);
                     // console.error("message 9"+response.headers.get('x-annups-alert')); 
                    this.loadAll();
                    this.fonctionSuccess=true;
                    this.form.reset();

                },
                error => {
                     this.msg = error.headers.get('x-annups-error');

                    /*  console.error("message de error"+res); */

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

        this.fonctionService.onDelete(id).subscribe(response => {
               
            //  this.getAllServices();
            this.fonctionDeleteSuccess=true;
            this.msg = response.headers.get('x-annups-alert');
            this.loadAll();

            console.error("message " + this.msg);
           // this.formUpdate.reset();

        },
            error => {
                this.msg = error.headers.get('x-annups-error');
              

            });

    }

}

}



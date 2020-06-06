import {
    Component, OnInit, ChangeDetectionStrategy,
    ViewChild,
    TemplateRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../../shared';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from '../../ngb-date-fr-parser-formatter';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Ferier } from '../../models/ferier.model';
import { CongeService } from '../conge.service';
  
@Component({
    selector: 'app-ferier',
    templateUrl: './ferier.component.html',
    styleUrls: ['ferier.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]

})
export class FerierComponent implements OnInit {

    listFerier = new Array<Ferier>();
    projet: string = "/projet";
    organ: string = "";
    conge: string = "";
    courrier: string = "/suiviecourrier/home";
    account: any;
    msg: any;
    configSuccess: boolean;
    configError: boolean;
    bsConfig: Partial<BsDatepickerConfig>;
    colorTheme = 'theme-dark-blue';
    jour: any;
    statusCode: any;
    ferier: Ferier;
    allFerier: Ferier[];

   
  
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,

        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private principal: Principal,
        private storageService: StateStorageService,
        private congeService: CongeService,
        private modal: NgbModal

    ) {
    }
    ngOnInit() {
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
        this.getAllFerier();
    }

    onClickModuleProjet() {
        this.router.navigate([this.projet]);

    }
    /*   onClickModuleConge()
      {
        this.router.navigate([this.conge]);
      
      } */
    onClickModuleCourrier() {
        this.router.navigate([this.courrier]);

    }
    onClickModuleOrgan() {
        this.router.navigate(['/employe/', this.account.id]);

    }

    ajoutJour() {

        this.ferier = new Ferier(null);
        this.ferier.jour = this.jour;
        this.listFerier.push(this.ferier);
        this.jour = null;
        //  console.error('affichage ' + JSON.stringify(this.listFerier));


    }

// delete pour le tableau temporaire 
    onDelete(sel: any) {
        console.error("helooo yeah");
        if (this.listFerier.length >= 0) {
            console.error("lenght" + this.listFerier.length);

            for (let i = 0; i < this.listFerier.length; i++) {

                if (sel == this.listFerier[i]) {
                    this.listFerier.splice(i, 1);
                    //  this.tabSelectedTempo.splice(i,1);
                }

               
            }



        }
    }


    getAllFerier(): Ferier[] {
        this.congeService.getAllFerier()
            .subscribe(
                data => this.allFerier = data,
                errorCode => this.statusCode = errorCode);
        console.error("ferier " + this.allFerier);
        return this.allFerier;
    }


    soumettre() {



        this.congeService.configJourFerier(this.listFerier).subscribe(
            response => {


                this.msg = response.headers.get('x-annups-alert');
                console.error("msg" + this.msg);
                this.configSuccess = true;
                this.listFerier = new Array();



            },
            error => {
                this.listFerier = new Array();

                this.msg = error.headers.get('x-annups-error');
                console.error("msg" + this.msg);
                this.configError = true;



            }
        );

        console.log('form end submitted!');






    }

    onDeleted(jour: any) {
        if (jour) {

            this.congeService.onDeleted(jour).subscribe(response => {

                //  this.getAllServices();
                this.msg = response.headers.get('x-annups-alert');
                this.configSuccess = true;
                this.getAllFerier();

                console.error("message " + this.msg);
                // this.formUpdate.reset();

            },
                error => {
                    this.msg = error.headers.get('x-annups-error');
                    this.configError = true;

                });

        }
    }














}
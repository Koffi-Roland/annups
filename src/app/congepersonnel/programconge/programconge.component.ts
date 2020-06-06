import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../../shared';
import { NgbDateFRParserFormatter } from '../../ngb-date-fr-parser-formatter';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TypeConge } from '../../models/typeconge.model';
import { CongeService } from '../conge.service';
import { Employe } from '../../models/employe';
import { Conge } from '../../models/conge.model';
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
import { HttpResponse } from '@angular/common/http';
import { JhiParseLinks } from 'ng-jhipster';
import * as moment from 'moment';
@Component({
    selector: 'app-programconge',
    templateUrl: './programconge.component.html',
    styleUrls: ['programconge.component.css'],
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]

})
export class ProgramCongeComponent implements OnInit {

    projet: string = "/projet";
    organ: string = "";
    conge: string = "";
    account: any;
    datedebut: Date;
    datfin: Date;
    statusCode: any;
    allTypeconge: TypeConge[];
    bsValue = new Date();
    bsConfig: Partial<BsDatepickerConfig>;
    colorTheme = 'theme-dark-blue';
    employe: any;
    entity: Conge = new Conge(null);
    congeSuccess: boolean;
    congeError: boolean;
    msg: any;
    dateDebut: any;
    dateFin: any;
    @ViewChild('f') form: any;
    nombreJours: any;

    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        private formatService: NgbDateFRParserFormatter,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private principal: Principal,
        private storageService: StateStorageService,
        private congeService: CongeService


    ) {
    }
    ngOnInit() {
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.getAllTypeconge();
    }
    getAllTypeconge(): TypeConge[] {
        this.congeService.getAllTypeconge()
            .subscribe(
                data => this.allTypeconge = data,
                errorCode => this.statusCode = errorCode);
        console.error("test" + this.allTypeconge);
        return this.allTypeconge;
    }

    loadSearch(key: string) {
        this.congeService.getEmployeByMatricule(key)
            .subscribe(
                data => this.employe = data.body,
                errorCode => this.statusCode = errorCode);
        console.error("test" + JSON.stringify(this.employe));
        return this.employe;
    }



    onChangeNbreJours() {
       // this.nombreJours = null;
     /*   this.dateDebut=null;
        this.dateFin=null; */
        this.dateDebut = moment(this.entity.dateDebut).format("YYYY-MM-DD");
        this.dateFin = moment(this.entity.dateFin).format("YYYY-MM-DD");
        console.error("date debut" + JSON.stringify(this.entity.dateDebut));
        console.error("date fin" +  this.entity.dateFin);
        // if (this.dateFin) {
        if ((this.dateDebut === undefined) && (this.dateFin === undefined)) {
           // console.error("Date vide");
            console.error("in");
        }
        else {
            console.error("out");
            this.congeService.getNombreJour(this.dateDebut, this.dateFin, this.employe.id)
                .subscribe(
                    data => this.nombreJours = data.body,
                    errorCode => this.statusCode = errorCode);
             console.error("nombre" + JSON.stringify(this.nombreJours));

            this.entity.nbrJour = this.nombreJours;
            return this.nombreJours;
        }

    }



    onSubmit() {
        if (this.form.valid) {

            console.log("form submitted!");

            try {

                this.entity.employe = this.employe;

                console.error("this.form.value=" + JSON.stringify(this.entity));
                this.congeService.saveConge(this.entity).subscribe(
                    response => {

                        this.msg = response.headers.get('x-annups-alert');
                        this.congeSuccess = true;
                        this.entity=  new Conge(null);
                        this.nombreJours=null;
                        this.employe= new Employe(null);
                        this.employe.fonction=null;
                        this.employe.service=null;
                        console.error("msg"+this.msg);
                        
                      //  this.form.reset();
                        // this.loadSearch(null);
/*                         console.error("vide" + JSON.stringify(this.employe));
 */                    },
                    error => {
                        this.msg = error.headers.get('x-annups-error');
                        this.congeError = true;
                    }
                );

                console.log("form end submitted!");

            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
            /*   } else {
                  console.error("date de naissance inferieur à la date d'embauche");
              } */

        } else {
            console.log(" form not submited");
        }
    }
    onClickModuleProjet() {
        this.router.navigate([this.projet]);

    }
    onClickModuleConge() {
        this.router.navigate([this.conge]);

    }
    onClickModuleOrgan() {
        this.router.navigate(['/employe/', this.account.id]);

    }
}
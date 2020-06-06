import { Component, OnInit, ViewChild } from '@angular/core';
import { JhiParseLinks } from 'ng-jhipster';
import { Router } from '@angular/router';
import { Principal } from '../../../shared';
import { Employe } from '../../../models/employe';
import { EmploiService } from '../../employe/service/employe.service';
import { EmployeTempo } from '../../../models/employetempo';

import { TranslateService } from '@ngx-translate/core';
import { LANGS } from '../../../app.constants';


@Component({
    selector: 'app-update-info',
    templateUrl: './update-employe-info-temp.component.html'
})
export class UpdateEmployeInfoTempComponent implements OnInit {
    title = 'mise à jour info';
    account: any;
    id: any;
    matricule: any;
    errors: any;
    employetempoSuccess: any;
    employetempoError: any;
    imageError: boolean;
    prenomSecondaire: any;
    filename: any;
    imageSrc: any;
    adress: any;
    _langs: any;
    msg:any;
    employe: EmployeTempo = new EmployeTempo(null);

    @ViewChild('formUpdate') formUpdate: any;
    @ViewChild('myInput') myInputVariable: any;
    entity: any;
    constructor(
        private router: Router,
        private principal: Principal,
        private employeService: EmploiService,
        private translate: TranslateService

    ) {
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);
    }
    ngOnInit() {

        this.principal.identity().then((account) => {
            this.account = account;
            // this.matricule=this.account.matricule;
            this.getEmployeBymatricule(this.account.matricule);
        });



    }
    getEmployeBymatricule(matricule: any) {

        this.employeService.getEmployeByMatricule(matricule).subscribe(
            (data) => {

                this.entity = data;
                console.error('erreur de id' + JSON.stringify(this.entity));
            },
            err => {
                console.log('erreur de id' + JSON.stringify(err));
                this.errors = err.statuts;
            }

        );
    }


    handleInputChange(e) {
        this.imageError = false;
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var reader = new FileReader();
        console.error("console image error" + file.type);
        if (!file.type.match('image/*')) {
            this.imageError = true;
            this.filename = "Le fichier " + file.name + " est invalide";
            this.myInputVariable.nativeElement.value = "";

            return;
        }

        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        //  console.error("log binary"+ btoa(this.imageSrc));
    }

    resetUpload() {
        this.myInputVariable.nativeElement.value = "";
        this.imageSrc = null;
        this.filename = null;
        this.imageError = false;

    }


    onUpdate() {
        if (this.formUpdate.valid) {


            this.employe.id = this.entity.id;
            this.employe.matricule = this.entity.matricule;
            this.employe.adresse = this.entity.adresse;
            this.employe.emailPerso = this.entity.emailPerso;
            this.employe.prenomsecond = this.prenomSecondaire;
            this.employe.photo = this.imageSrc;
            this.employe.telPerso1 = this.entity.telPerso1;
            this.employe.telPerso2 = this.entity.telPerso2;
            this.employe.telPerso3 = this.entity.telPerso3;

            try {

                this.employeService.updateEmploye(this.employe).subscribe(response => {

                    //  this.getAllServices();
                    this.msg = response.headers.get('x-annups-alert');
                    this.employetempoSuccess = true;
                    console.error("message update" + this.msg);
                    // this.formUpdate.reset();

                },
                    error => {
                         this.msg = error.headers.get('x-annups-error');
                        this.employetempoError = true;

                    });

                console.log("form end submitted!");
            }
            catch (error) {
                console.log("exception e = " + error);
                console.log(" form end exeception");
            }
        }


    }

}



import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiPaginationUtil } from 'ng-jhipster';
import { HttpResponse } from '@angular/common/http';
import { SelectDropDownModule } from 'ngx-select-dropdown';


import { NgxSpinnerService } from 'ngx-spinner';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { TranslateService } from '@ngx-translate/core';

//import { _ServicesService } from '../../../services/service/services.service';



import { TypeCourrier } from '../../models/typecourrier';
import { TraitementCourrier } from '../../models/traitementcourrier';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';
import { Service } from '../../models';
import { Courrier } from '../../models/courrier';
import { CourierService } from '../courier.service';
import { EmploiService } from '../../administration/employe/service/employe.service';
import { LANGS } from '../../app.constants';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Component({
    selector: 'app-home-admin-courier-new',
    templateUrl: './envoi.component.html',
    styleUrls: ['./envoi.css']
})
export class CourierNewComponent implements OnInit/* , OnDestroy */ {

    allServices: Service[];
    alltypecourrier: TypeCourrier[];
    envoiCouriers = new Array<TraitementCourrier>();
    traitementCourrier: TraitementCourrier;
    isSaving: boolean;
    service: any;
    referentiel: any;
    datePrevisionnelTraitement: any;
    typecourrier: any;
    serviceSelected = new Array<any>();
    tabSelectedTempo = new Array<any>();
    modalRef: BsModalRef;
    traitementSelected = new Array<any>();
    courrierError: any;
    courrierSuccess: any;
    msg: any;
    param = { value: '' };
    imageSrc: any;
    fichierContenu: any;
    fichierCourrier: any;
    imageError: boolean;
    filename: any;
    showImage: boolean;
    // serviceSelected=[];
    dateRetourPrevisionelle: any;
    typeCourier: any;
    statusCode: any;
    listRouteUrl: string = '/admin/employe/list';
    colorTheme = 'theme-dark-blue';
    bsConfig: Partial<BsDatepickerConfig>;
    @ViewChild('f') form: any;
    @ViewChild('myInput') myInputVariable: any;
    public spinnerConfig: any = {
        bdColor: 'rgba(51,51,51,0.8)',
        size: 'large',
        color: '#fafafa',
        loadigText: 'Loading...'
    };
    send: boolean = false;
    resend: boolean = false;
    _langs: string;
    today: Date;
    name: any="ok socket";
    ws: any;
    socket:any;
    greetings: string[] = [];
    willDate: Date;
    entity: Courrier = new Courrier(null);
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private eventManager: JhiEventManager,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private paginationUtil: JhiPaginationUtil,
        private paginationConfig: PaginationConfig,
        private _emploiService: EmploiService,
        private courrierService: CourierService,
        private translate: TranslateService,
        private modalService: BsModalService,


    ) {
        this.today = new Date();
        // this.maxDate = new Date();
        //this.minDate.setDate(this.minDate.getDate() - 1);
        // this.maxDate.setDate(this.maxDate.getDate() + 7);
        this._langs = LANGS;
        translate.setDefaultLang(this._langs);
        translate.use(this._langs);

    }

    ngOnInit() {
      //  this.connect();
        this.getAllService();
        this.getAllTypeCourrier();
        this.initValues();
        this.bsConfig = Object.assign({}, { containerClass: this.colorTheme }, { dateInputFormat: 'DD-MM-YYYY' });
        this.imageError = false;
        this.showImage = false;
        this.referentiel = null;

       
    }

    /*   let socket = new WebSocket("ws://192.168.1.6:8080/organ-socket");
      this.        ws = Stomp.over(socket);
      let that = this;
      this.ws.connect({}, function(frame) {
        that.ws.subscribe("/errors", function(message) {
          alert("Error " + message.body);
        });
        that.ws.subscribe("/topic/reply", function(message) {
          console.log(message)
          that.showGreeting(message.body);
        });
      //  that.disabled = true;
      }, function(error) {
        alert("STOMP error " + error);
      }); */

    connect(){
 //connection au websocket
 this.socket = new SockJS("http://192.168.1.6:8084/annups/organ-socket");

 // let socket = new WebSocket("ws://192.168.1.6:8084/annups/organ-socket");
  this.ws = Stomp.over(this.socket);
  let that = this;
  this.ws.connect({}, function (frame) {
    /*   that.ws.subscribe("/errors", function (message) {
          alert("Error " + message.body);
      }); */
      that.ws.subscribe("/topic/reply", function (message) {
          console.log(message);
          that.showGreeting(message.body);
      });
      //  that.disabled = true;
  }, function (error) {
      alert("STOMP error " + error);
  });

  // fin connection au websocket
    }
    disconnected() {
        if (this.ws != null) {
          this.ws.ws.close();
        }
       // this.setConnected(false);
        console.log("Disconnected");
      }
     /*  setConnected(connected) {
        this.disabled = connected;
        this.showConversation = connected;
        this.greetings = [];
      } */

    showGreeting(message) {
        //this.showConversation = true;
        this.greetings.push(message)
    }


    sendName(service) {
        let data = JSON.stringify({
            'id': service
        })
        this.ws.send("/api/topic/nbr", {}, data);
    }


    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    }

    decline(): void {
        this.modalRef.hide();
    }


    initValues() {
        this.send = true;
        this.resend = false;
    }
    activeSend() {
        this.send = true;
        this.resend = false;
    }

    activeResend() {
        this.send = false;
        this.resend = true;
    }

    handleInputChange(e) {
        this.imageError = false;
        this.showImage = false;
        var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        var reader = new FileReader();
        console.error("console image error" + file.type);
        if (file.type.match('application/x-msdownload') || file.type.match('.rar') || file.type.match('.zip')) {

            this.imageError = true;
            this.showImage = false;
            this.filename = "Le fichier " + file.name + " est invalide";
            this.myInputVariable.nativeElement.value = "";

            return;
        }
        if (file.type.match('image/*')) {
            this.showImage = true;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
        let reader = e.target;
        this.imageSrc = reader.result;
        console.error("log binary" + btoa(this.imageSrc));
    }



    resetUpload() {
        this.myInputVariable.nativeElement.value = "";
        this.imageSrc = null;
        this.filename = null;
        this.showImage = false;
        this.imageError = false;

    }


    getAllService(): Service[] {
        this._emploiService.getAllService()
            .subscribe(
                data => this.allServices = data,
                errorCode => this.statusCode = errorCode);
        return this.allServices;
    }
    getAllTypeCourrier(): TypeCourrier[] {
        this.courrierService.getAllTypeCourrier()
            .subscribe(
                data => this.alltypecourrier = data,
                errorCode => this.statusCode = errorCode);
        return this.alltypecourrier;
    }
    private onSaveSuccess(result, headers) {
        //  this.eventManager.broadcast({ name: 'userListModification', content: 'OK' });
        this.isSaving = false;
        // this.activeModal.dismiss(result.body);
        console.error('consolidation');
    }

    private onSaveError() {
        this.isSaving = false;
    }
    affectTableau() {
        if (this.service && this.dateRetourPrevisionelle && this.typeCourier) {
            console.error('affichage du retour' + JSON.stringify(this.service));
            this.traitementCourrier = new TraitementCourrier(null);
            this.traitementCourrier.service = this.service;
            this.traitementCourrier.typeCourier = this.typeCourier;
            this.traitementCourrier.dateRetourPrevisionelle = this.dateRetourPrevisionelle;
            // this.traitementCourrier.typeCourier = this.typecourrier;
            // console.error('affichage du de traitement'+ JSON.stringify( this.traitementCourrier)); 
            this.envoiCouriers.push(this.traitementCourrier);
            console.error('affichage ' + JSON.stringify(this.envoiCouriers));
            this.tabSelectedTempo.push(this.traitementCourrier);
            // console.error('dordgldjs'+this.serviceSelected);
            this.service = null; this.dateRetourPrevisionelle = null; this.typeCourier = null;
        }

    }

    desactiverTab(sel: any) {
        console.error("helooo yeah");
        if (this.tabSelectedTempo.length >= 0) {
            console.error("lenght" + this.tabSelectedTempo.length);

            for (let i = 0; i < this.tabSelectedTempo.length; i++) {

                console.error("formulaire active" + JSON.stringify(sel));
                if (sel == this.tabSelectedTempo[i]) {
                    this.envoiCouriers.splice(i, 1);
                    this.tabSelectedTempo.splice(i, 1);
                }
                console.error("formulaire dto" + "i " + i + " " + JSON.stringify(this.envoiCouriers[i]));

                // this.serviceSelected[i].service.datePrevisionnelTraitement;
                // console.error("affichage loooo"+ this.serviceSelectedTempo[i]);
            }



        }
    }

    /*   onFileChange(event) {
         let reader = new FileReader();
         let valueOk:any;
         if(event.target.files && event.target.files.length > 0) {
           let file = event.target.files[0];
           reader.readAsDataURL(file);
           reader.onload = () => {
             this.form.get('fichierContenu').setValue({
                 valueOk: reader.result.split(',')[1],
              
             })
             console.error("value de charge de fichier"+ valueOk);
           };
         }
       }  */

    /* code test */

    /* getFilesOne(event) {
        // this.files = new FileList();
        this.selectedFiles = event.target.selectedFiles;
        var reader = new FileReader();
        reader.onload = this._handleReaderLoadedOne.bind(this);
        reader.readAsDataURL(this.selectedFiles[0]);
    }
    
    _handleReaderLoadedOne(readerEvt) {
        this.entity.fichierCourrier = readerEvt.target.result;
    
    } */

    /* code fin test */






    /* 
    checkDate(){
    
    } */



    onSubmit() {
        this.spinner.show();
        //  if (this.form.valid) {
        if (this.tabSelectedTempo.length >= 0) {
            for (let i = 0; i < this.tabSelectedTempo.length; i++) {

                //console.log('this.form.value='+ JSON.stringify(this.serviceSelectedTempo[i]));
                this.entity.envoiCouriers[i] = this.tabSelectedTempo[i];
                console.error('formulaire dto' + 'i ' + i + ' ' + JSON.stringify(this.tabSelectedTempo[i]));

                // this.serviceSelected[i].service.datePrevisionnelTraitement;
                // console.error('affichage loooo'+ this.serviceSelectedTempo[i]);
            }
        }
/*             console.error('formulaire dto' + JSON.stringify(this.entity));
 */            this.entity.fichierCourrier = btoa(this.imageSrc);
        /*             console.error(" Fichier courier affichage top"+ btoa(this.entity.fichierCourrier));
         */
        this.courrierService.saveCourrier(this.entity).subscribe(
            response => {
              //  this.sendName(6); 
                this.referentiel = this.entity.reference;
                this.param.value = this.referentiel;

                this.msg = response.headers.get('x-annups-alert');
                this.courrierSuccess = true;
                this.form.reset();
                this.resetUpload();
              //  this.disconnected();
                this.envoiCouriers = new Array();
                this.tabSelectedTempo = new Array();
                this.spinner.hide();
                this.modalRef.hide();

            },
            error => {  
               /*  this.envoiCouriers = new Array();
                this.tabSelectedTempo = new Array();  */
               // this.disconnected();

                this.msg = error.headers.get('x-annups-error');
                console.error("msg"+this.msg);
                this.courrierError = true;
                this.spinner.hide();
                this.modalRef.hide();


            }
        );

        console.log('form end submitted!');




    }



    // }



}





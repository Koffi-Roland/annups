import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//import { BsCollapse} from 'ngx-bootstrap/collapse';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employe, Projet } from '../models';
import { EmployeService } from './employe.service';
import {
  SIZE,
  PAGE,
  MAX_SIZE,
  CURRENT_PAGE_NUMBER,

} from '../app.constants';
import { Principal } from 'src/app/shared/auth/principal.service';
import { Account, StateStorageService } from '../shared';
import { Droit } from '../models/droit';
import { LoginService } from '../login';
@Component({
  selector: 'app-employe-detail',
  templateUrl: './employe.detail.component.html',
  styles: ['./detail.css', './tree.css'],
})
export class EmployeDetailComponent implements OnInit {
  @ViewChild(ModalDirective) modal: ModalDirective;
  @ViewChild('childModal') childModal: ModalDirective;

  @Input() id: string;
  employes: Employe;
  employe: Employe = new Employe();
  title: string;
  body: Employe;
  errors: any;
  erreurProjet: any
  listFils: Employe[];
  sousListFils: any;
  parent: boolean;
  searchOp = false;
  allListOp = true;
  isCollapsed = true;
  isOpen = false;
  hasProject: any = false;
  hasSuivie: any = false;
  projets: Projet[];
  taches: any[];
  isOpenAlert: boolean = false;
urlRedirect : string;
  modalRef: BsModalRef;
  droit: Droit;
  droits: Droit[];
  account: any;
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private employeService: EmployeService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private _location: Location,
    private principal: Principal,
    private storageService: StateStorageService,
    private loginService: LoginService

  ) {



  }

  ngOnInit() {
    this.spinner.show();
    const ts = this._activatedRoute.snapshot.params['id'];
    //this.isProdEnvironment = route.snapshot.data[0]['isProd'];
    // const tss = this._activatedRoute.snapshot.data['send'];
    this.title = ts;
    // this.body = tss;
    this.getEmployeById(ts);
    this.getEmployeByFils(ts);
    this.getHasProject(ts);
    this.getHasSuivie(ts);
    // this.getEmployeByFils(ts);
    //const redirect= this.storageService.storeUrl(this.router.url);
    this.principal.identity().then((account) => {
      this.account = account;
    });


  }

  showChildModal(id: string): void {
    this.childModal.show();
  }
  /*==================================modal=====================================*/
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  /*================================modal=====================================*/
  getEmployeById(id: string): void {
    this.employeService.getEmployeById(id)
      .subscribe(
        (data) => {
          // this.employe = new Employe();
          this.employe = data;
          console.log('EMPLOYE ' + JSON.stringify(this.employe));
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
          // this._location.back();
          this.router.navigate(['home']);
        }

      );
  }


  getProjetByEmploye(employe): void {
    this.employeService.getProjetByEmploye(employe)
      .subscribe(
        (data) => {
          let d: any = data;
          this.projets = d.content;
          console.log('listProjets' + JSON.stringify(this.projets));
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }


  getTacheByProjet(id: string): void {
    this.employeService.getTacheByProjet(id)
      .subscribe(
        (data) => {
          let d: any = data;
          this.taches = d.content;
          console.log('listFils' + JSON.stringify(this.taches));
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }


  getEmployeByFils(id: string): void {
    this.employeService.getEmployeByFils(id)
      .subscribe(
        (data) => {
          let d: any = data;
          this.listFils = d.content;
          console.log('listFils' + JSON.stringify(this.listFils));
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }
  verifyRoute() {
    if (this.employe == null) {
      this.router.navigated = false;
    }
  }

  getEmployeByFilson(id: string): void {
    this.employeService.getEmployeByFilson(id)
      .subscribe(
        (data) => {
          this.sousListFils = data;
          // console.log('listFils' + JSON.stringify(this.listFils));
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }
  getHasProject(id: any): void {
    this.employeService.hasProject(id)
      .subscribe(
        (data) => {
          this.hasProject = data;
          console.log('projet' + this.hasProject);
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }

  getHasSuivie(id: any): void {
    this.employeService.hasSuivie(id)
      .subscribe(
        (data) => {
          this.hasSuivie = data;
          console.log('suivie' + this.hasSuivie);
        },
        err => {
          console.log('erreur de id' + JSON.stringify(err));
          this.errors = err.statuts;
        }

      );
  }


  /*  openModal(template: TemplateRef<any>,id : string) {
   console.log("IDDDDDDDDDDDDDDDDDDDDDDDDDDD "  +id);
     this.modalRef = this.modalService.show(template, Object.assign({}, this.modalConfig, { class: 'modal-sm', initialState });
   } */

  showModal(id: string): void {
    this.id = id;
    this.modal.show();
  }

  hideChildModal(): void {
    this.modal.hide();
  }


  /*  collapse.show(){
   this.isOpen = true;
   }
  */
  getSousFils(id: string) {
    if (this.isOpen == false) {
      this.getEmployeByFilson(id);
      this.isOpen = true;
    } else {
      this.sousListFils = []
      this.isOpen = false;

    }

  }

  /* getUserDroits(matricule: any) {
     this.employeService.getUserDroits(matricule)
       .subscribe(
         data => {
           this.droits = data;
           console.error('erreur de id 88888' + JSON.stringify( this.droits));
         },
         err => {
           console.log('erreur de id' + JSON.stringify(err));
           this.errors = err.statuts;
         }
       );
    // return this.droits;
   }
 */
  onClickFils(employe: any) {
    if (this.account) {
      //  console.error("affichage route"+this.router.url);
      // const redirect= this.storageService.storeUrl(this.router.url);
      console.error("affichage matricule " + (this.account.matricule));
      this.employeService.getUserDroits(this.account.matricule)
        .subscribe(
          data => {
            let d: any = data;
            this.droits = d;

            for (let auth of this.droits) {
            /*  console.error('eoorooorooro' + auth.label);
                console.error('eoorooorooroemploye' +employe.id);
                console.error('eoorooorooroaccount' +  this.account.id);
                console.error('eoorooorooroemployeservice' +employe.service.id);
                console.error('eoorooorooroaccountservice' +this.account.service.id); */

              if (auth.label === "ROLE_ADMIN") {
                this.router.navigate(['projet-detail', employe.id]);
                break;
              } else if ((auth.label === "ROLE_ADMIN_PROJET") && (employe.service.id === this.account.service.id)) {
                this.router.navigate(['projet-detail', employe.id]);
                break;
              }
              else if ((auth.label === "ROLE_CONSULTER_PROJET") && (employe.id === this.account.id)) {
                this.router.navigate(['projet-detail', employe.id]);
                break;
              }
              else {
                this.urlRedirect = `projet-detail/${employe.id}`;
                this.isOpenAlert = true;
                this.erreurProjet = "Vous ne pouvez pas accéder à cette page ";
                /*  let url = `projet-detail/${employe.id}`;
                  const redirect= this.storageService.storeUrl(url); */
                //this.router.navigate(['login']); 
                /// this.loginService.logout(); 

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
      // this.loginService.logout(); 
      let url = `projet-detail/${employe.id}`;
      const redirect = this.storageService.storeUrl(url);
      this.router.navigate(['login']);

    }

  }

redirectLogin(){
  const redirect = this.storageService.storeUrl(this.urlRedirect);
      this.router.navigate(['login']);
}

  onClickFilsSuivie(employe: any) {
    if (this.account) {
      if (this.account.matricule === employe.matricule) {
        this.router.navigate(['suiviecourrier']);
      } else {
        // this.loginService.logout(); 
        let url = `suiviecourrier`;
        const redirect = this.storageService.storeUrl(url);
        this.router.navigate(['login']);

      }
    } else {
      let url = `suiviecourrier`;
      const redirect = this.storageService.storeUrl(url);
      this.router.navigate(['login']);
    }


  }
}



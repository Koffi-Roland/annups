import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../shared';

@Component({
    selector: 'app-conge',
    templateUrl: './conge.component.html',
    styleUrls: ['conge.component.css']
})
export class CongeComponent implements OnInit {
    navbartitle  = 'home conge' ;
    projet:string="/projet";
    organ:string="";
    conge:string="";
    courrier:string="/suiviecourrier/home";
    account:any;
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,
      
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private principal: Principal,
        private storageService: StateStorageService
    
    
    ) {
    }
    ngOnInit() { 
        this.navbartitle  = 'home conge' ;
    }

    onClickModuleProjet(){
        this.router.navigate([this.projet]);
      
      }
    /*   onClickModuleConge()
      {
        this.router.navigate([this.conge]);
      
      } */
      onClickModuleCourrier(){
        this.router.navigate([this.courrier]);
      
      }
      onClickModuleOrgan()
      {
        this.router.navigate(['/employe/',this.account.id]);
      
      }
}
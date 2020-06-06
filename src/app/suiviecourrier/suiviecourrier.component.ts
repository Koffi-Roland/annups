import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../shared';

@Component({
    selector: 'app-suiviecourrier',
    templateUrl: './suiviecourrier.html',
    styleUrls: ['suiviecourrier.css']
})
export class SuivieCourrierComponent implements OnInit {
    title = 'suivie courrier';
    navbartitle  = 'Suivie courrier' ;
    projet:string="/projet";
    organ:string="";
    conge:string="/conge/home";
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
        this.navbartitle  = 'Suivie courrier' ;
        this.principal.identity().then((account) => {
            this.account = account;
          });
    }

    onClickModuleProjet(){
        this.router.navigate([this.projet]);
      
      }
      onClickModuleConge()
      {
        this.router.navigate([this.conge]);
      
      }
     onClickModuleOrgan()
      {
        this.router.navigate(['/employe/',this.account.id]);
      
      }
}
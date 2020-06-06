import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../shared';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.css']
})
export class AdminComponent implements OnInit {
  title = 'admin';
  courrier:string="/suiviecourrier/home";
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
    this.principal.identity().then((account) => {
      this.account = account;
    });
}
onClickModuleCourrier(){
  this.router.navigate([this.courrier]);

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



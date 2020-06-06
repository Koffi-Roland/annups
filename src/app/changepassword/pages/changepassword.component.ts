import { Component, AfterViewInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';

import { TranslateService } from '@ngx-translate/core';
import { LANGS } from '../../app.constants';
import { ChangePassword } from '../../models/changepassword';
import { ChangePasswordService } from '../service/changepassword.service';
import { StateStorageService } from '../../shared';

@Component({
  selector: 'app-change_password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']

})
export class ChangePasswordComponent {
  //implements AfterViewInit
  authenticationError: boolean=false;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;
   _langs: string;
   code:any; 
   passwordold:any;
   passwordnew:any;
   confirmpassword:any;
   @ViewChild('f') form: any;
   success:any;
   error:any;
  // mycode:any;
   errorCode:any;
msg:any;
   param : any;
 redirectUrl : any;
   isOpenAlert = false;
  //        public activeModal: NgbActiveModal
  entity:ChangePassword=new ChangePassword(null)
  constructor(
    private eventManager: JhiEventManager,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private stateStorageService: StateStorageService,
    private translate: TranslateService,
    private changepasswordService:ChangePasswordService
  ) {
    this.credentials = {};
    this._langs=LANGS;
    translate.setDefaultLang(this._langs);
    translate.use(this._langs);
  }

/* 
  register() {
  
    //                this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    //                this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/reset', 'request']);
  } */
  ChangePassword(){
    if (this.form.valid) {

      console.log("form submitted!");
      try {
        console.error('password' + JSON.stringify(this.entity));

          this.changepasswordService.changePassword(this.entity).subscribe( response=> {
              this.msg=response.headers.get('x-annups-alert'); 
              this.success=true;  
              this.router.navigate(['/login']);
   
            //  this.form.reset();                    
               },
                  error => {
                    this.msg=error.headers.get('x-annups-error');
                   this.error=true;

                  });
         
          console.log("form end submitted!");

      }
      catch (error) {
          console.log("exception e = " + error);
          console.log(" form end exeception");
      }

  } else {
      console.log("form not submitted!");

  }


  }
  retour(){
    let previousUrl=this.stateStorageService.getUrl();
    this.router.navigate([previousUrl]);
  }
  
}

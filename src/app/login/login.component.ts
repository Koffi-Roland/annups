import { Component, AfterViewInit, Renderer, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService, } from './login.service';
import { StateStorageService } from '../shared/';
import { TranslateService } from '@ngx-translate/core';

import {
 LANGS
} from '../app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  //implements AfterViewInit
  authenticationError: boolean=false;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;
   _langs: string;
   code:any; 
  // mycode:any;
   errorCode:any;
   param : any;
 redirectUrl : any;
   isOpenAlert = false;
  //        public activeModal: NgbActiveModal
  constructor(
    private eventManager: JhiEventManager,
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router,
    private translate: TranslateService,
  ) {
    this.credentials = {};
    this._langs=LANGS;
    translate.setDefaultLang(this._langs);
    translate.use(this._langs);
    

  }

  //    ngAfterViewInit() {
  //        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
  //    }

  cancel() {
    this.credentials = {
      username: null,
      password: null,
      rememberMe: true
    };
    this.authenticationError = false;
    //        this.activeModal.dismiss('cancel');
  }

  login() {
     this.redirectUrl = this.stateStorageService.getUrl();
    this.loginService.login({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    }).then(() => {
      this.authenticationError = false;
//      if(this.redirectUrl == null){
          this.router.navigate(['admin/home']); 
//      }else{
//           this.router.navigate([this.redirectUrl]);
//      }
     
      //            this.activeModal.dismiss('login success');
      if (this.router.url === '/register' || (/activate/.test(this.router.url)) ||
        this.router.url === '/finishReset' || this.router.url === '/requestReset') {

      }

      this.eventManager.broadcast({
        name: 'authenticationSuccess',
        content: 'Sending Authentication Success'
      });

      // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
      // // since login is succesful, go to stored previousState and clear previousState
      const redirect = this.stateStorageService.getUrl();
      if (redirect) {
        if(redirect.toString()==="change_password"){
          this.router.navigate(['home']);
        }else this.router.navigate([redirect]);
      }
    })
    
    .catch((err) => {
      this.authenticationError = true;
      this.stateStorageService. storeUrl(this.redirectUrl)
      this.code='login.'+JSON.parse(err._body).AuthenticationException; 
 //this.mycode = ''
    
     // console.log("erroroyoyo " + JSON.stringify(err));
    //  console.error("eroooope "+err);

     /*  if(this.authenticationError){
      
      } */
     // this.param = {value: 'world'}
    });
  }

  register() {
  
    //                this.activeModal.dismiss('to state register');
    this.router.navigate(['/register']);
  }

  requestResetPassword() {
    //                this.activeModal.dismiss('to state requestReset');
    this.router.navigate(['/reset', 'request']);
  }
}

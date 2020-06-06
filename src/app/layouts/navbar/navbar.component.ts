import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Principal, StateStorageService, } from '../../shared';
import { LoginService } from '../../login';
import { JhiEventManager } from 'ng-jhipster';
//import { VERSION, DEBUG_INFO_ENABLED } from '../../app.constants';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.css'
    ]
})
export class NavbarComponent implements OnInit {

    navbartitle = 'Administration';
    //    inProduction: boolean;
    isNavbarCollapsed: boolean = false;
    //    languages: any[];
    //    swaggerEnabled: boolean;
    //    modalRef: NgbModalRef;
    //    version: string;
    account: Account;

    constructor(
        private loginService: LoginService,
        private principal: Principal,
        private eventManager: JhiEventManager,
        private router: Router,
        private stateStorageService: StateStorageService,
    ) {

    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }
    backToUserProject(){
        if(this.account.id){
            this.router.navigate(["/projet-detail",this.account.id]);
        }

    }
    

    backToOrgan(){
        console.error("account id       "+this.account.id);
        if(this.account.id===null){
            this.router.navigate(["/employe"]); 
        }else{
            this.router.navigate(["/employe",this.account.id]);
        }
    }
 
    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
            });
        });
    }


    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        //        this.modalRef = this.loginModalService.open();
        this.router.navigate(['/login']);
    }
    goHome() {
        if (this.principal.isAuthenticated()) {
            // this.router.navigate(['admin/home']);
            this.router.navigate(['']);
        } else {
            this.router.navigate(['']);
        }

    }

    logout() {
        //        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['login']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
    getInfo() {
        return this.isAuthenticated() ? this.principal.getInfos() : null;
    }
    goToUserProfile() {
        this.router.navigate(['admin/updateprofil']);
    }
  /*   getRoute() {
        if (this.router.routerState == "admin") {

        } else if{
            this.router.routerState == "suiviecourrier"
        }
    } */

    goToChangePassword() {
//this.stateStorageService.storeUrl();
        this.router.navigate(['change_password']);
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Principal, Account } from '../../shared';
import { JhiEventManager } from 'ng-jhipster';
import { DashboardService } from './dashboard.service';
@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./dash.css']
})
export class AdminHomeComponent implements OnInit {
    title = 'backoffice';
    account: Account;
    tasks: any;
    tasksService: any;
    tasksAdmin: any;

    project: any;
    projectService: any;
    projectAdmin: any;
    errors: any;
    single: any[];
    singleService: any[];
    singleAdmin: any[];
    pro: any[];


    multi: any[];

    view: any[] = [380, 300];

    // options
    showLegend = true;

    colorScheme = {
        domain: ['#28a745', '#e3e9ee', '#007bff', '#dc3545', '#C7B42C', '#000000','#AAAAAA']
    };

    // pie
    showLabels = true;
    explodeSlices = false;
    doughnut = false;
    constructor(
        private principal: Principal,
        private eventManager: JhiEventManager,
        private router: Router,
        private dashBoardService: DashboardService
    ) {
       

    }

    ngOnInit() {
        this.getTasks();
        this.getTaskService();
        this.getTaskAdmin();
        this.getProject();
        this.getProjectAdmin();
        this.getProjectService();
      

        this.principal.identity().then((account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
        //      this.dashBoardService.getTasks().then((tss)=>{
        //          this.tasks = tss;
        //          console.log("okkkk " +this.tasks);
        //      });

    }




    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
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
        /*  this.modalRef = this.loginModalService.open(); */
        this.router.navigate(['/login']);
    }

    getTasks(): any[] {
        this.dashBoardService.getTasks()
            .subscribe(
                data => this.tasks = data,
                errorCode => this.errors = errorCode);

        return this.tasks;
    }

    getTaskService(): any[] {
        this.dashBoardService.getTaskService()
            .subscribe(
                data => this.tasksService = data,
                errorCode => this.errors = errorCode);
        //   console.error("taskok"+this.tasksService);
        return this.tasksService;
    }
    getTaskAdmin(): any[] {
        this.dashBoardService.getTaskAdmin()
            .subscribe(
                data => this.tasksAdmin = data,
                errorCode => this.errors = errorCode);
        return this.tasksAdmin;
    }




    getProject(): any[] {
        this.dashBoardService.getProject()
            .subscribe(
                data => this.project = data,
                errorCode => this.errors = errorCode);
        return this.project;
    }

    getProjectService(): void {
        this.dashBoardService.getProjectService()
            .subscribe(
                 
                data => this.projectService = data,
                errorCode => this.errors = errorCode);
        return this.projectService;
                
            
                
               /*
                data => this.projectService = data,
                errorCode => this.errors = errorCode);*/
        // console.error("projet"+this.projectService);
       // this.pro=this.projectService;
       // return this.projectService;
    }
    getProjectAdmin(): any[] {
        this.dashBoardService.getProjectAdmin()
            .subscribe(
                data => this.projectAdmin = data,
                errorCode => this.errors = errorCode);
        return this.projectAdmin;
    }

}

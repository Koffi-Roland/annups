import {Component, OnInit, Input} from '@angular/core';
import {EmployeService} from '../employe/employe.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Observable, of} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {DataService} from '../config/data.service';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {
    SIZE,
    PAGE,
    MAX_SIZE,
    CURRENT_PAGE_NUMBER,
    TEMPS_ATTENTE
} from '../app.constants';
import {Employe} from '../models';

@Component({
    selector: 'app-home',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.css']
})
export class AccueilComponent implements OnInit {
    // @Input('search')
   // errors : any;
    searchkey: string;
    isCollapsed = false;
    message: string;
    share: string;
    afficherSimple: boolean;
    afficherAvancee: boolean;

    employes: Employe[];
    listEmployes: any;
    data: any;
    errors: any;
    _size: number;
    _page: number;
    totalPages: Number;
    totalElements: Number;
    search: string = null;
    maxSize = MAX_SIZE;
    currentPageNumber = CURRENT_PAGE_NUMBER;
    go: any = false;
    //  bigTotalItems = 175;
    // bigCurrentPage = 1;


    /* App SPINNER CONSTANT */

    error = false;
    searchOp = false;
    allListOp = true;
    location: Location;
    isOpenAlert = false;
    constructor(
        location: Location,
        private router: Router,
        private employeService: EmployeService,
        private spinner: NgxSpinnerService,
        private _activatedRoute: ActivatedRoute,
        private dataService: DataService
        // private configService: ConfigService
    ) {
        this.location = location;
    }


    ngOnInit() {
        // this.rechercheSimple();
        this.dataService.currentMessage.subscribe(share => this.share = share)
    }

    rechercheSimple() {
        this.message = 'Recheche simple';
        this.afficherSimple = true;
        this.afficherAvancee = false;
    }
    rechercheAvancee() {
        this.message = 'Recheche avancée';
        this.afficherSimple = false;
        this.afficherAvancee = true;
    }

    getKey(key: string) {
        if (key != null) {
            this.searchkey = key;
            this.dataService.changeMessage(this.searchkey);

            this.employeService.searchEmployesCount(key).subscribe(
                data => {
                    this.go = data;
                    if (this.go == true) {
                        this.errors = null;
                        this.employeService.searchEmployesCount(key)
                        this.router.navigate(['employe']);
                        this._activatedRoute.snapshot.data['mykey'] = key;
                    }else{
                        this.isOpenAlert = true;
                        this.errors =  "Cet employé n'existe pas "
                    }
                }
                ,
                (err) => {
                    this.isOpenAlert = true;
                    this.errors = "erreur provenant du serveur " ;
                }
            );
        }
    }
    /*  newMessage() {
       this.data.changeMessage("Hello from Sibling")
     }
      */
    /*  searchEmployes(key: string) {
  
     console.log('aaaaii ' + key);
     if (key == null) {
  
     } else {
      // this.spinner.show();
       this.setPage();
       this.search = key;
     // this.router.navigate(['employe', employe.id]);
   
       this.employeService.searchEmployes(key, this._page, this._size).subscribe(
         data => {
           this.data = data;
           console.log('iiiiiii ' + JSON.stringify(this.data));
           this.employes = [];
           this.employes = this.data.content;
           this.totalElements = this.data.totalElements;
           this._activatedRoute.data =  this.data.content;
           console.log('oooooo ' + JSON.stringify(this._activatedRoute.data));
         }
         ,
         (err) => {
           this.errors = err;
         }
       );
  
     }
  
   } */
    setPage(): void {
        this.currentPageNumber = CURRENT_PAGE_NUMBER;
    }

}



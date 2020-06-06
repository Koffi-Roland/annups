import { Component, OnInit } from '@angular/core'; 
import { EmployeService } from '../employe/employe.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgForm } from '@angular/forms' ;
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../config/data.service';
import {
  SIZE,
  PAGE,
  MAX_SIZE,
  CURRENT_PAGE_NUMBER,
  TEMPS_ATTENTE
} from '../app.constants';
import { Employe } from '../models';

@Component({
  selector: 'app-recherche-detail',
  templateUrl: './recherche-avancee.component.html',
  styleUrls: ['./detail.css']
})
export class RechercheAvanceeComponent implements OnInit {
  searchkey: any ;
isCollapsed = false;
message : string;
afficherSimple : boolean;
afficherAvancee : boolean

 employes: Employe[];
  listEmployes: any;
  data: any;
  errors: any;
  _size: number;
  _page: number;
  totalPages: Number;
  totalElements: Number;
 // search: string = null;
  maxSize = MAX_SIZE;
  currentPageNumber = CURRENT_PAGE_NUMBER;
  //  bigTotalItems = 175;
  // bigCurrentPage = 1;


  /* App SPINNER CONSTANT */

  error = false;
  searchOp = false;
  allListOp = true;

constructor(
    private router: Router,
    private employeService: EmployeService,
    private spinner: NgxSpinnerService,
    private _activatedRoute: ActivatedRoute,
    private dataService: DataService
    // private configService: ConfigService
  ) {}


  ngOnInit() {
   this.rechercheSimple();
  }
  
  rechercheSimple(){
     this.message = 'Recheche simple' ;
     this.afficherSimple = true;
    this.afficherAvancee = false;
  }
rechercheAvancee(){
      this.message = 'Recheche avancée' ;
       this.afficherSimple = false;
    this.afficherAvancee = true;
  }
  
  getKey(key: any) {
    if (key != null) {
      this.searchkey = key; 
      this.dataService.changeMessage(this.searchkey);
      this.router.navigate(['employe']);
      //this._activatedRoute.snapshot.data['mykey'] = key;
    }
  }

  search(form : NgForm){
    this.searchkey = {"nom" : form.value.nom, "prenom" : form.value.prenom,
    "service" : form.value.service,"fonction" : form.value.fonction,
  "telPro": form.value.telPro, "telAbbr" : form.value.telAbbr,}
  //this.searchkey = form.value
  if(this.searchkey.nom == null && this.searchkey.prenom == null && this.searchkey.service == null && this.searchkey.fonction == null && this.searchkey.telPro == null && this.searchkey.telAbbr == null){
      console.log('Veuillez renseigner au moins un champs pour votre recherche')
  } else{
    console.log(' pour votre recherche' +this.searchkey.nom) 
    this.dataService.changeMessage(this.searchkey);
    this.router.navigate(['employeadvance']);

  }  
 
// console.log('Ahooo mama '+ JSON.stringify(this.searchkey.nom)); 
  }
  
 /*    searchEmployes(key: string) {

    console.log('aaaaii ' + key);
    if (key == null) {

    } else {
     // this.spinner.show();
      this.setPage();
     // this.search = key;
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
//      this.searchOperation();
     // this.spinner.hide();

    }

  } */
   setPage(): void {
    this.currentPageNumber = CURRENT_PAGE_NUMBER;
  }
  
}



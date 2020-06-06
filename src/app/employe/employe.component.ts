import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, of } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employe } from '../models';
import { EmployeService } from './employe.service';
import { DataService } from '../config/data.service';

import {
  _SIZE,
  SIZE,
  PAGE,
  MAX_SIZE,
  CURRENT_PAGE_NUMBER,
  TEMPS_ATTENTE,
  TIMEOUT,
} from '../app.constants';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
 styleUrls: ['./detail.css']
})
export class EmployeComponent implements OnInit {
share : string;
shareO : any;
  employes: Employe[];
  listEmployes: any;
  data: any;
  errors: any;
  _size: number = _SIZE;
  _page: number = PAGE;
  totalPages: Number;
  totalElements: Number;
  searchs: string = null;
  maxSize = MAX_SIZE;
  currentPageNumber = CURRENT_PAGE_NUMBER;
  alertTimeout : number = TIMEOUT;
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
  ) {

  }

  ngOnInit() {
    
    this.dataService.currentMessage.subscribe(share => this.share = share);
  //  this.dataService.currentObject.subscribe(share => this.shareO = share);
    console.log(' lalalallal ' + JSON.stringify(this.share));
   // if(this.share.toString ==)
   //if(this.share.valueOf)
   console.log('kala kala ' +this.share)
   this.searchEmployes(this.share);
  //  this.searchAdvanceEmployes(this.share);
    /* if(this.share == null){ 
     
    }else{
      this.searchAdvanceEmployes(this.shareO);
    }
    */
   // console.log(' lalalallal ' +this._activatedRoute.snapshot.data['mykey']);
    
   // this.getEmploye();
  // this.spinner.show();
    /*
           setTimeout(() => {
                spinner ends after 5 seconds
               this.spinner.hide();
           }, 500000);
          */
  }

  deleteEmploye(employe: Employe): void {
    this.employeService.deleteEmploye(employe)
      .subscribe(data => {
        this.employes = this.employes.filter(u => u !== employe);
      });
  }
  getEmploye() {

    this.spinner.show();
    this.employeService.getEmployes(this._page, this._size).subscribe(
      (data) => {
        // data = 
      
        this.error = false;
        this.data = data;
        this.employes = this.data.content;
        this.totalElements = this.data.totalElements;
        this.spinner.hide();
      },
      (error) => {

        // this.errors = err;
        this.spinner.hide();
        this.error = true;
        setTimeout(() => {
          //   spinner ends after 5 seconds
          this.spinner.hide();
        }, TEMPS_ATTENTE);
      });
    this.allListOperation();

  }

  onClickRow(employe: Employe) {
    console.log(' +++++++ employe' + JSON.stringify(employe));
    console.log('begin ' + this._activatedRoute.snapshot.data['title']);
    // this._activatedRoute.snapshot.data['send'] = employe;
    this.router.navigate(['employe', employe.id]);
    console.log(' final ' + this._activatedRoute.snapshot.data['title']);
  }
  searchEmployes(key: string) {

    console.log('alooo ' + key);
    if (key == null) {
      console.log('alooo ' + key);
    } else {
      this.spinner.show();
      this.setPage();
      this.searchs = key;
      this.employeService.searchEmployes(key, this._page, this._size).subscribe(
        data => {
          this.data = data;
          console.log('hmmmmamam' + JSON.stringify(this.data.content));
          this.employes = [];
          this.employes = this.data.content;
          this.totalElements = this.data.totalElements;
        //  console.log('oooooo ' + JSON.stringify(this.totalElements));
        }
        ,
        (err) => {
          this.errors = err;
        }
      );
      this.searchOperation();
      this.spinner.hide();

    }

 
  }
  searchAdvanceEmployes(key: any) {

    console.log('alooo ' + key);

    if (key == null) {
      console.log('alooo ' + key);
    } else {
      this.spinner.show();
      this.setPage();
      this.searchs = key;
      this.employeService.advancedSearch(key.nom,key.prenom,key.service,key.fonction,key.telPro,key.telAbbr, this._page, this._size).subscribe(
        data => {
          this.data = data;
          console.log('hmmmmamam' + JSON.stringify(this.data.content)); 
          this.employes = [];
          this.employes = this.data.content;
          this.totalElements = this.data.totalElements;
        //  console.log('oooooo ' + JSON.stringify(this.totalElements)); 
        }
        ,
        (err) => {
          this.errors = err;
        }
      );
      this.searchOperation();
      this.spinner.hide();

    }


  }

  pageChanged(event: PageChangedEvent): void {

    const _page = event.page - 1;
    const _size = event.itemsPerPage;
    if (this.searchOp === true) {
      this.employeService.searchEmployes(this.searchs, _page, _size).subscribe(
        data => {
          // data = data
          this.data = data;
          this.employes = this.data.content;
          this.totalElements = this.data.totalElements;
          console.log('oooooo ' + JSON.stringify(this.totalElements));
        }
        ,
        (err) => {
          this.errors = err;
        });
    } else {
      this.employeService.getEmployes(_page, _size).subscribe(
        data => {
          // data = data
          this.data = data;
          this.employes = this.data.content;
          this.totalElements = this.data.totalElements;
          console.log('oooooo ' + JSON.stringify(this.totalElements));
        }
        ,
        (err) => {
          this.errors = err;
        });
    }

  }

  searchOperation() {
    this.searchOp = true;
    this.allListOp = false;
  }
  allListOperation() {
    this.searchOp = false;
    this.allListOp = true;
  }

  initialiser() {
    this._size = SIZE;
    this._page = PAGE;
  }
  setPage(): void {
    this.currentPageNumber = CURRENT_PAGE_NUMBER;
  }


}

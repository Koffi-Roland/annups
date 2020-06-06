import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {  DetailModalService } from './detailmodal.service';


@Component({
    selector: 'app-employe-modal-dialog',
    templateUrl: './employe-detail-dialog.component.html'
})
export class EmployeModalDialogComponent implements OnInit {


    constructor(
        public activeModal: NgbActiveModal,
 
    ) {}

    ngOnInit() {
      
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

   


}



@Component({
    selector: 'app-employe-detail-dialog',
    template: ''
})
export class EmployeDetailDialogComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detailModalService:  DetailModalService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.detailModalService.open(EmployeModalDialogComponent as Component, params['id']);
            } else {
                this.modalRef = this.detailModalService.open( EmployeModalDialogComponent as Component);
            }
        });
    }
   
    
    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
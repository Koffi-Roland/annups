import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { Projet } from '../models';
import { EmployeService } from './employe.service';


@Injectable()
export class  DetailModalService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeService: EmployeService
    ) {}

    open(component: Component, id?: string): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.employeService.getProjetByEmploye(id).subscribe((projets) => this.userModalRef(component, projets));
          //  console.log("tttttttttttttttttt "+JSON.stringify(projets))
        } 
        /*else {
            return this.userModalRef(component, new Projet());
        }*/
    }

    userModalRef(component: Component, projets: any): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.projet = projets;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}


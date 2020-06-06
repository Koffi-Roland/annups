import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import {Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized} from '@angular/router';
import {ProjetRouteAccessService} from '../../shared/';
import { ActivatedRoute } from '@angular/router';
import { ProjetService} from '../projet.service';
import { Projet} from '../../models' ;
import { Subscription } from 'rxjs/Subscription';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
    selector: 'app-projet-detail',
    templateUrl: './projet-detail.component.html',
    styleUrls: ['./detail.css']
})
export class ProjetDetailComponent implements OnInit , OnDestroy  {
  affectProjet: any;
  private subscription: Subscription;
  modalRef: BsModalRef;

  constructor(
      private projetService: ProjetService,
      private route: ActivatedRoute,
      private modalService: BsModalService
  ) {
  }

  ngOnInit() {
      this.subscription = this.route.params.subscribe((params) => {
          this.load(params['id']);
      });
  }

  load(id) {
    this.projetService.find(id).subscribe((projetAffectation) => {
        this.affectProjet = projetAffectation;
    });
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
}
}



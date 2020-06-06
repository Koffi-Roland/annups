import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, RoutesRecognized } from '@angular/router';
import {ProjetRouteAccessService} from '../../shared/';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router,
    private projetAceess: ProjetRouteAccessService,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('fr');

  }

  private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
    let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'Annups';
    if (routeSnapshot.firstChild) {
      title = this.getPageTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getPageTitle(this.router.routerState.snapshot.root);
      }
    });

    this.projetAceess.VerifyProjetExistAndStore()
  }

}

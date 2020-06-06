import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Parametre} from '../../models/';

@Injectable()
export class ProjetExistActived implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {
  }
  
   private url = 'api/parametres';
    private parametre = new Parametre();
    public getParametre<Response>() {
        return this.http.get(this.url);
    }
    getProjetExist() {

        this.getParametre().subscribe(
            (data) => {
                this.parametre = data;
                return this.parametre.projetExist;
            },
            (error) => {
                console.log(JSON.stringify(error));
            });


    }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const projetExist = this.getProjetExist();
    if (projetExist) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
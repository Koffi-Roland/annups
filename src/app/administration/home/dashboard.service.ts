import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, take, retryWhen, mergeMap, catchError, retry, tap } from 'rxjs/operators';
import { pipe, range, timer, zip } from 'rxjs';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { AbstractService } from '../../config/abstract.service';
import { SERVER_URL } from '../../app.constants';


@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private option: AbstractService) { }
  private taskUrl = SERVER_URL + 'api/dashboard/task';
  private taskServiceUrl = SERVER_URL + 'api/dashboard/task/service';
  private taskAdminUrl = SERVER_URL + 'api/dashboard/task/admin';

  private projectUrl = SERVER_URL + 'api/dashboard/projet';
  private projectServiceUrl = SERVER_URL + 'api/dashboard/projet/service';
  private projectAdminUrl = SERVER_URL + 'api/dashboard/projet/admin';




  public getTasks<Response>() {
    return this.http.get(this.taskUrl, this.option.getOption());
  }

  public getTaskService<Response>() {
    return this.http.get(this.taskServiceUrl, this.option.getOption());
  }

  public getTaskAdmin<Response>() {
    return this.http.get(this.taskAdminUrl, this.option.getOption());
  }


  public getProject<Response>() {
    return this.http.get(this.projectUrl, this.option.getOption());
  }

  public getProjectService<Response>() {
    return this.http.get(this.projectServiceUrl, this.option.getOption());
  }

  public getProjectAdmin<Response>() {
    return this.http.get(this.projectAdminUrl, this.option.getOption());
  }
}
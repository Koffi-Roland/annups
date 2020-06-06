import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('');
  private objectSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();
//currentObject = this.objectSource.asObservable();
  constructor() { }

  changeMessage(message: any) {
    this.messageSource.next(message)
  }
 /*  changeObject(o: any) {
    this.objectSource.next(o) 
  } */

}
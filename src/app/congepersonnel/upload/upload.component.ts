import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Principal, StateStorageService } from '../../shared';
import { HttpEventType, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CongeService } from '../conge.service';

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['upload.component.css']
})
export class UploadComponent implements OnInit {
    navbartitle = 'home';
    account: any;
    @ViewChild('f') form: any;
    @ViewChild('myInput')
    myInputVariable: any;
    uploadedFiles: any[] = [];
    msg: any;
    progressSuccessfuly: boolean;
    uploadSuccess: boolean;
    uploadError: boolean;
    constructor(
        /*   private projetService: ProjetService, */
        //        private alertService: JhiAlertService,

        private activatedRoute: ActivatedRoute,
        private router: Router,
        private spinner: NgxSpinnerService,
        private translate: TranslateService,
        private principal: Principal,
        private storageService: StateStorageService,
        private congeService: CongeService,

    ) {
    }
    ngOnInit() {
        this.navbartitle = 'home';
        this.progressSuccessfuly = true;
        this.initValues();
    }
    initValues() {
        this.uploadError = false;
        this.uploadSuccess = false;
    }

    reset() {
        console.log(this.myInputVariable.nativeElement.files);
        this.myInputVariable.nativeElement.value = "";
        console.log(this.myInputVariable.nativeElement.files);
    }

    selectedFiles: FileList
    currentFileUpload: File
    progress: { percentage: number } = { percentage: 0 }

    selectFile(event) {
        this.msg = "";

        this.selectedFiles = event.target.files;
        this.progress.percentage = 0;
    }

    upload() {
        //   this.progress.percentage = 0;
        this.initValues();
        this.currentFileUpload = this.selectedFiles.item(0)
        this.congeService.pushFileToStorage(this.currentFileUpload).subscribe(event => {

            if (event.type === HttpEventType.UploadProgress) {
                this.progress.percentage = Math.round(100 * event.loaded / event.total);
            }

            else if (event instanceof HttpResponse) {

                this.msg = event.headers.get('x-annups-alert');

                this.uploadSuccess = true;

                this.reset();
                // this.progress.percentage=0;
                console.log('File is completely uploaded!');

            }
        },
            (error: HttpErrorResponse) => {

                this.uploadError = true;
                this.msg = error.headers.get('x-annups-error');

            })

        // this.selectedFiles = undefined;
    }

}
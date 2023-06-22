import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BOOKTOUR_STATUS, storageKey } from 'src/app/app-constant';
import { Booktour } from 'src/app/app-management/Model/Booktour';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import * as FileSaver from 'file-saver';
@Component({
    selector: 'app-list-booktour',
    templateUrl: './list-booktour.component.html',
})
export class ListBooktourComponent implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService
    ) {}
    header: any;
    loading: boolean = false;
    listBooktour: Booktour[] = [];
    tripCode: number = -1;
    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.tripCode = this.route.snapshot.params['code'];
        this.loadData();
    }
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt1!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }
    loadData() {
        this.http
            .get<ResponseMessage>(
                '/api/v1/project/booktour/findByTourTripCode?tourTripCode=' +
                    this.tripCode,
                {
                    headers: this.header,
                }
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listBooktour = data.data;
                        // console.log(this.listBooktour);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                    }
                    console.log(data);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
    }
    exportExcel() {
        import('xlsx').then((xlsx) => {
            const worksheet = xlsx.utils.json_to_sheet(this.listBooktour);
            const workbook = {
                Sheets: { data: worksheet },
                SheetNames: ['data'],
            };
            const excelBuffer: any = xlsx.write(workbook, {
                bookType: 'xlsx',
                type: 'array',
            });
            this.saveAsExcelFile(excelBuffer, 'danhSach' + this.tripCode);
        });
    }
    saveAsExcelFile(buffer: any, fileName: string): void {
        let EXCEL_TYPE =
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(
            data,
            fileName + EXCEL_EXTENSION
        );
    }
}

import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { BOOKTOUR_STATUS, storageKey } from 'src/app/app-constant';
import { Booktour } from 'src/app/app-management/Model/Booktour';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-manage-booktour',
    templateUrl: './manage-booktour.component.html',
})
export class ManageBooktourComponent implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService,
        private confirmationService: ConfirmationService
    ) {}
    header: any;
    loading: boolean = false;
    listBooktour: Booktour[] = [];
    booktourSelected: Booktour = {
        numberOfAdjust: 0,
        numberOfChildren: 0,
        moneyToPay: 0,
    };
    status: any = BOOKTOUR_STATUS;
    tourTripInfor: any;
    isShowDetailBooktour: boolean = false;
    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
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
            .get<ResponseMessage>('/api/v1/project/booktour/findAll', {
                headers: this.header,
            })
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
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
    }
    async showBooktourDetail(object: any) {
        this.isShowDetailBooktour = true;
        this.loading = true;
        this.booktourSelected = object;
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/auth/trip/findTourTripInfor?code=' +
                    object.tourTripCode
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.tourTripInfor = data.data;
                        // console.log(this.tourTripInfor)
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loading = false;
    }
    confirmUpdate() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận cập nhật trạng thái đặt tour?',
            header: 'Xác nhận cập nhật trạng thái',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.updateBookTourStatus();
            },
            reject: () => {
                this.showBooktourDetail(this.booktourSelected);
            },
        });
    }
    confirmDelete() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận xóa đơn đặt tour?',
            header: 'Xác nhận xóa',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteBooktour();
            },
        });
    }
    async updateBookTourStatus() {
        this.loading = true;
        if (this.booktourSelected.status == 'confimred') {
            await this.http
                .put<ResponseMessage>(
                    '/api/v1/project/booktour/confirm?id=' +
                        this.booktourSelected.id,
                    null,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Cập nhật thành công',
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: data?.message,
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error occur',
                        });
                    }
                );
        } else if (this.booktourSelected.status == 'paid') {
            await this.http
                .put<ResponseMessage>(
                    '/api/v1/project/booktour/paid?id=' +
                        this.booktourSelected.id,
                    null,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Cập nhật thành công',
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: data?.message,
                            });
                        }
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error occur',
                        });
                    }
                );
        }
        this.loading = false;
    }
    async updateBooktour() {
        this.loading = true;
        await this.http
            .put<ResponseMessage>(
                '/api/v1/project/booktour/update?id=' +
                    this.booktourSelected.id,
                this.booktourSelected,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Cập nhật thành công',
                        });
                        this.loadData();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loading = false;
        this.isShowDetailBooktour = false;
    }

    async deleteBooktour() {
        this.loading = true;
        await this.http
            .delete<ResponseMessage>(
                '/api/v1/project/booktour/deleteById?id=' +
                    this.booktourSelected.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Xóa đơn đặt tour thành công',
                        });
                        this.loadData();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loading = false;
        this.isShowDetailBooktour = false;
    }
}

import { Trip } from 'src/app/app-management/Model/Trip';
import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Pitstop } from 'src/app/app-management/Model/Pitstop';
import { PitstopStatus } from 'src/app/app-management/Model/PitstopStatus';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-home-tourguide',
    templateUrl: './home-tourguide.component.html',
})
// @Pipe({name: 'findPitstopStatus'})
export class HomeTourguideComponent implements OnInit {
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

    tourTripInfor: any;
    listBookTour: Tour[] = [];
    listTrip: any[] = [];
    showDetailTour: boolean = false;
    canStart: boolean = false;
    canFinish: boolean = false;
    loading: boolean = false;
    listPitstop: Pitstop[] = [];
    listPitstopStatus: PitstopStatus[] = [];
    pitstopSelected: Pitstop = {};
    note: string = '';
    isShowConfirm: boolean = false;
    tripSelected: Trip = {};
    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.loadData();
    }
    loadData() {
        this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/findByTourGuide?username=' +
                    this.authService.getUsername(),
                { headers: this.header }
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTrip = data.data;
                        // console.log(this.listTrip)
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

    async detail(object: any) {
        this.showDetailTour = true;
        this.tripSelected = object;
        // console.log(object.tourTripCode)
        let code = object.tourTripCode;
        if (code == undefined) code = object.code;
        await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/auth/trip/findTourTripInfor?code=' + code
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.tourTripInfor = data.data;
                        // console.log(this.tourTripInfor);
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
        // find list pitstop
        await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/auth/pitstop/findByTourId?tourId=' +
                    this.tourTripInfor.tourModel.id
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.listPitstop = data.data;
                        // console.log(this.listPitstop)
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
        // find status
        await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/findPitstopStatus?tripCode=' +
                    this.tourTripInfor.code,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.listPitstopStatus = data.data;
                        // console.log(this.listPitstopStatus)
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
        for (let i = 0; i < this.listPitstopStatus.length; i++) {
            let data = this.listPitstop.filter((x) => {
                return x.id == this.listPitstopStatus[i].pitstopId;
            })[0];
            // console.log(data)
            data.status = this.listPitstopStatus[i].status;
            data.note = this.listPitstopStatus[i].note;
            data.tripPitstopId = this.listPitstopStatus[i].id;
        }
        // console.log(this.listPitstopStatus)
        // console.log(this.listPitstop);
        this.canStart = this.tourTripInfor.status == 'confimred' ? true : false;
        this.canFinish = this.tourTripInfor.status == 'ontrip' ? true : false;
    }
    // findPitstopStatus(id:number) {
    //     for(let i = 0;i<this.listPitstopStatus.length;i++) {
    //         if(this.listPitstopStatus[i].pitstopId == id) {
    //             return this.listPitstopStatus[i];
    //         }
    //     }
    //     return {};
    // }

    async startTrip() {
        this.loading = true;
        this.showDetailTour = false;
        await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/start?id=' + this.tourTripInfor.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Chuyến đi đã bắt đầu!',
                        });
                        this.loadData();
                        // console.log(this.tourTripInfor)
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                        this.showDetailTour = true;
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

    async finishTrip() {
        this.loading = true;
        this.showDetailTour = false;
        await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/finish?id=' + this.tourTripInfor.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Chuyến đi đã kết thúc!',
                        });
                        this.loadData();

                        // console.log(this.tourTripInfor)
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                        this.showDetailTour = true;
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
    confirmStart() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận bắt đầu chuyến đi?',
            header: 'Xác nhận chuyến đi',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.startTrip();
            },
        });
    }

    confirmFinish() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận kết thúc chuyến đi?',
            header: 'Xác nhận chuyến đi',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.finishTrip();
            },
        });
    }
    showConfirm(object: any) {
        this.pitstopSelected = object;
        this.isShowConfirm = true;
        this.note = '';
    }
    async confirmPitstop() {
        this.isShowConfirm = false;
        this.loading = true;
        await this.http
            .post<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/pitstop/confirm?tripPitstopId=' +
                    this.pitstopSelected.tripPitstopId,
                this.pitstopSelected.note||'',
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        // this.tourTripInfor = data.data;
                        // console.log(this.tourTripInfor);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Xác nhận thành công',
                        });
                        this.detail(this.tripSelected)
                    } else {
                        this.isShowConfirm = true;
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

    async cancelPitstop() {
        this.isShowConfirm = false;
        this.loading = true;
        await this.http
            .post<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/pitstop/cancel?tripPitstopId=' +
                    this.pitstopSelected.tripPitstopId,
                this.pitstopSelected.note,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        // this.tourTripInfor = data.data;
                        // console.log(this.tourTripInfor);
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Hủy thành công',
                        });
                        this.detail(this.tripSelected)
                    } else {
                        this.isShowConfirm = true;
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
            this.loading =false;
    }
    listBooktour() {
        this.router.navigate(['pages/list-booktour/'+this.tripSelected.code])
    }
}

import { Observable, async, finalize } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService,ConfirmationService} from 'primeng/api';
import { Table } from 'primeng/table';
import { DEPARTURE, STATUS_TRIP, storageKey } from 'src/app/app-constant';
import { Pitstop } from 'src/app/app-management/Model/Pitstop';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { Trip } from 'src/app/app-management/Model/Trip';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Account } from 'src/app/app-management/Model/Account';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
    selector: 'app-manage-tour',
    templateUrl: './manage-tour.component.html',
    styles : [`
        input[type=file]::file-selector-button {
            margin-right: 20px;
            border: none;
            background: #084cdf;
            padding: 10px 20px;
            border-radius: 5px;
            color: #fff;
            cursor: pointer;
            transition: background .2s ease-in-out;
          }
          
          input[type=file]::file-selector-button:hover {
            background: #0d45a5;
          }
          `]
})
export class ManageTourComponent implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;
    loading: boolean = false;
    listTour: Tour[] = [];
    listTourSelected: Tour[] = [];
    isShowDetailTour: boolean = false;
    tourSelected: Tour = {};
    listPitstop: Pitstop[] = [];
    listTrip: Trip[] = [];
    isShowUpdateTrip: boolean = false;
    tripSelected: Trip = {};
    listTripDelete: Trip[] = [];
    isCreate: boolean = false;
    pitstopSelected: Pitstop = {};
    isShowUpdatePitstop: boolean = false;
    isShowCreateTour: boolean = false;
    listDeparture: any[] = [];
    listDesSelected: number[] = [];
    listDestination: any[] = [];


    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService,
        private storage: AngularFireStorage,
        private confirmationService: ConfirmationService
    ) {}
    header: any;
    status: any[] = STATUS_TRIP;
    tourGuide: Account[] = [];
    // firebase
    selectedFile: any;
    fb: string = '';
    downloadURL: Observable<string> | undefined;

    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.listDeparture =  DEPARTURE;
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
            .get<ResponseMessage>('/api/v1/project/tour/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTour = data.data;
                        // console.log(this.listTour)
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
        this.http
            .get<ResponseMessage>('/api/v1/project/account/tourguide', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.tourGuide = data.data;
                        // console.log(this.listTour)
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

    async showDetailTour(object: any) {
        this.loading = true;
        this.tourSelected = object;
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/auth/pitstop/findByTourId?tourId=' + object.id
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
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/trip/findByTourId?tourId=' + object.id,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.listTrip = data.data;
                        // console.log(this.listTrip)
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
        this.isShowDetailTour = true;
        this.loading = false;
    }
    showUpdateTrip(object: any) {
        this.isCreate = false;
        this.tripSelected = object;
        this.isShowUpdateTrip = true;
        // console.log(object)
    }
    showCreateTrip() {
        this.isCreate = true;
        this.tripSelected = {};
        this.isShowUpdateTrip = true;
    }
    showUpdatePitstop(object: any) {
        this.isCreate = false;
        this.isShowUpdatePitstop = true;
        this.pitstopSelected = object;
    }
    showCreatePitstop() {
        this.isCreate = true;
        this.pitstopSelected = {};
        this.isShowUpdatePitstop = true;
    }
    showCreateTour() {
        this.tourSelected = {};
        this.tourSelected.createdBy = this.authService.getUsername();
        this.isShowCreateTour= true;
        this.http.get<ResponseMessage>("/api/v1/project/auth/des/findAll").subscribe(
            data => {
                if(data.resultCode == 0 ) {
                    this.listDestination = data.data;
                    // console.log(this.listDestination)
                }
                else {
                    this.messageService.add({severity:'error', summary:data.message});
                }
            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )

    }
    async updateTrip() {
        this.loading = true;
        if (!this.isCreate) {
            await this.http
                .put<ResponseMessage>(
                    '/api/v1/project/trip/update?id=' + this.tripSelected.id,
                    this.tripSelected,
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
                            this.isShowUpdateTrip = false;
                            this.showDetailTour(this.tourSelected);
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
        } else {
            await this.http
                .post<ResponseMessage>(
                    '/api/v1/project/trip/create?tourId=' +
                        this.tourSelected.id,
                    [this.tripSelected],
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Tạo chuyến đi thành công',
                            });
                            this.isShowUpdateTrip = false;
                            this.showDetailTour(this.tourSelected);
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
    addTourguide() {
        this.http
            .get<ResponseMessage>(
                '/api/v1/project/trip/addTourguide?tripId=' +
                    this.tripSelected.id +
                    '&username=' +
                    this.tripSelected.tourGuide,
                {
                    headers: this.header,
                }
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Cập nhật thành công',
                        });
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
    async deleteTrip() {
        this.loading = true;
        for (let i = 0; i < this.listTripDelete.length; i++) {
            await this.http
                .delete<ResponseMessage>(
                    '/api/v1/project/trip/delete?id=' +
                        this.listTripDelete[i].id,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary:
                                    'Xóa thành công chuyến đi ' +
                                    this.listTripDelete[i].code,
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
        this.showDetailTour(this.tourSelected);
        this.listTripDelete = [];
        this.loading = false;
    }
    onFileSelected(event: any) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `travel/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`travel/${n}`, file);
        task.snapshotChanges()
            .pipe(
                finalize(async () => {
                    this.downloadURL = fileRef.getDownloadURL();
                    await this.downloadURL.toPromise().then((url) => {
                        if (url) {
                            this.pitstopSelected.imageUrl = url;
                            // console.log(this.pitstopSelected)
                        }
                        // console.log(this.fb);
                    });
                })
            )
            .subscribe((url) => {
                if (url) {
                    // console.log();
                }
            });
        // console.log("done");
    }

    onFileSelectedTour(event: any) {
        var n = Date.now();
        const file = event.target.files[0];
        const filePath = `travel/${n}`;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(`travel/${n}`, file);
        task.snapshotChanges()
            .pipe(
                finalize(async () => {
                    this.downloadURL = fileRef.getDownloadURL();
                    await this.downloadURL.toPromise().then((url) => {
                        if (url) {
                            this.tourSelected.imageUrl = url;
                            // console.log(this.pitstopSelected)
                        }
                        // console.log(this.fb);
                    });
                })
            )
            .subscribe((url) => {
                if (url) {
                    // console.log();
                }
            });
        // console.log("done");
    }

    updatePitstop() {
        this.loading = true;
        this.http
            .post<ResponseMessage>(
                '/api/v1/project/pitstop/updateList?tourId='+
                    this.tourSelected.id,
                { "pitStopModels":[this.pitstopSelected],
                  "deletePitstopId": []
            },
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Cập nhật thành công điểm dừng ',
                        });
                        this.isShowUpdatePitstop = false;
                        this.showDetailTour(this.tourSelected);
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
    deletePitstop() {
        this.loading = true;
        this.http
            .post<ResponseMessage>(
                '/api/v1/project/pitstop/updateList?tourId=' +
                    this.tourSelected.id,
                { 'deletePitstopId': [this.pitstopSelected.id],
                    'pitStopModels': []},
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Xóa thành công điểm dừng ',
                        });
                        this.isShowUpdatePitstop = false;
                        this.showDetailTour(this.tourSelected);
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
    createTour() {
        this.loading = true;
        this.http
            .post<ResponseMessage>(
                '/api/v1/project/tour/create', {
                    'desId' :this.listDesSelected,
                    'tour': this.tourSelected
                }
              ,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Tạo tour thành công ',
                        });
                        this.isShowCreateTour = false;
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
    }
    updateTour() {
        this.loading = true;
        this.http
            .put<ResponseMessage>(
                '/api/v1/project/tour/update?tourId='+this.tourSelected.id,this.tourSelected
              ,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Cập nhật tour thành công ',
                        });
                        this.isShowCreateTour = false;
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
    }
    async openTour() {
        this.loading = true;
        for (let i = 0; i < this.listTourSelected.length; i++) {
            await this.http
                .put<ResponseMessage>(
                    '/api/v1/project/tour/open?tourId=' +
                        this.listTourSelected[i].id,null,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary:
                                    'Mở thành công tour ' +
                                    this.listTourSelected[i].code,
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
        this.loadData();
        this.listTourSelected= [];
        this.loading = false;
    }

    async closeTour() {
        this.loading = true;
        for (let i = 0; i < this.listTourSelected.length; i++) {
            await this.http
                .put<ResponseMessage>(
                    '/api/v1/project/tour/close?tourId=' +
                        this.listTourSelected[i].id,null,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary:
                                    'Đóng thành công tour ' +
                                    this.listTourSelected[i].code,
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
        this.loadData();
        this.listTourSelected= [];
        this.loading = false;
    }

    async deleteTour() {
        this.loading = true;
        for (let i = 0; i < this.listTourSelected.length; i++) {
            await this.http
                .delete<ResponseMessage>(
                    '/api/v1/project/tour/delete?tourId=' +
                        this.listTourSelected[i].id,
                    { headers: this.header }
                )
                .toPromise()
                .then(
                    (data) => {
                        if (data?.resultCode == 0) {
                            this.messageService.add({
                                severity: 'success',
                                summary:
                                    'Xóa thành công tour ' +
                                    this.listTourSelected[i].code,
                            });
                        } else {
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Không thể xóa tour '+this.listTourSelected[i].code,
                            });
                            // console.log(data)
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
        this.loadData();
        this.listTourSelected= [];
        this.loading = false;
    }
    confirmDelete() {
        console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận xóa các tour đã chọn?',
            header: 'Xác nhận xóa tour',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteTour();
            },
            reject: () => {
               this.listTourSelected = [];
            }
        });
    }

    showConfirmTrip() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận thực hiện chuyến đi?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.confirmTrip();
            }
        });
    }

    showConfirmCancelTrip() {
        // console.log("delete")
        this.confirmationService.confirm({
            message: 'Xác nhận hủy thực hiện chuyến đi?',
            header: 'Xác nhận',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.cancelTrip();
            }
        });
    }
    async confirmTrip() {
        await this.http
        .get<ResponseMessage>(
            '/api/v1/project/trip/confirmTrip?tripId=' +
                this.tripSelected.id,
            { headers: this.header }
        )
        .toPromise()
        .then(
            (data) => {
                if (data?.resultCode == 0) {
                    this.messageService.add({
                        severity: 'success',
                        summary:
                            'Xác nhận thành công chuyến đi ' +
                            this.tripSelected.code,
                    });
                    this.showDetailTour(this.tourSelected);
                    this.isShowUpdateTrip = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: data?.message,
                    });
                    // console.log(data)
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

    async cancelTrip() {
        await this.http
        .get<ResponseMessage>(
            '/api/v1/project/trip/cancelTrip?tripId=' +
                this.tripSelected.id,
            { headers: this.header }
        )
        .toPromise()
        .then(
            (data) => {
                if (data?.resultCode == 0) {
                    this.messageService.add({
                        severity: 'success',
                        summary:
                            'Hủy thành công chuyến đi ' +
                            this.tripSelected.code,
                    });
                    this.showDetailTour(this.tourSelected);
                    this.isShowUpdateTrip = false;
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: data?.message,
                    });
                    // console.log(data)
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

   
}

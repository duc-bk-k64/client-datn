import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { Booktour } from 'src/app/app-management/Model/Booktour';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Pitstop } from 'src/app/app-management/Model/Pitstop';
import { PitstopStatus } from 'src/app/app-management/Model/PitstopStatus';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-list-tour-user',
    templateUrl: './list-tour-user.component.html',
})
export class ListTourUserComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService
    ) {}
    header: any;

    tourTripInfor: any;
    listBookTour: Tour[] = [];
    listTrip: any[] = [];
    showDetailTour: boolean = false;
    canFeedback: boolean = false;
    showFeedback: boolean = false;
    rating: number = 0;
    comment: string  = '';
    loading: boolean = false;
    listPitstop: Pitstop[] = [];
    listPitstopStatus: PitstopStatus[] = [];
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
                '/api/v1/project/booktour/findByUsername?username=' +
                    this.authService.getUsername(),
                { headers: this.header }
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listBookTour = data.data;
                        // console.log(this.listBookTour)
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
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/trip/findByAccount?username=' +
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
        this.canFeedback = this.tourTripInfor.status == 'finish' ? true : false;
    }
    showFeedbackDialog() {
      this.showDetailTour = false;
      this.showFeedback = true;

    }
    async feedback() {
      this.loading = true;
      await this.http
      .post<ResponseMessage>(environment.backendApiUrl+
          '/api/v1/project/feedback/create?tripId=' + this.tourTripInfor.id,{'rating':this.rating,'content':this.comment},{headers:this.header}
      )
      .toPromise()
      .then(
          (data) => {
              if (data?.resultCode == 0) {
                 this.showFeedback = false;
                 this.messageService.add({
                  severity: 'success',
                  summary: "Đánh giá chuyến đi thành công!",
              });

                  // console.log(this.tourTripInfor)
              } else {
                  this.messageService.add({
                      severity: 'error',
                      summary: data?.message,
                  });
              }
            //   console.log(data)
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
}

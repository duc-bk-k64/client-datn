import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { storageKey } from 'src/app/app-constant';
import { Profile } from 'src/app/app-management/Model/Profile';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-manage-refund',
    templateUrl: './manage-refund.component.html',
})
export class ManageRefundComponent implements OnInit {
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
    listRefund: any[] = [];
    refundSelected: any;
    isShowRefundDetail: boolean = false;
    profile: Profile = {};
    ngOnInit(): void {
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
            .get<ResponseMessage>(environment.backendApiUrl+'/api/v1/project/refund/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listRefund = data.data;
                        console.log(this.listRefund);
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
    showDetailRefund(object : any) {
      this.isShowRefundDetail = true;
      this.refundSelected = object;
      this.profile = {};
      this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/getProfile?username="+object.account.username,{headers:this.header}).subscribe(
        data => {
            if(data.resultCode == 0) {
               this.profile = data.data;
               console.log(this.profile)

            } else {
                this.messageService.add({severity:'error', summary:"Error occur"});
            }
        },
    );
    }
    showConfirmRefund() {
      // console.log("delete")
      this.confirmationService.confirm({
          message: 'Xác nhận đã hoàn tiền cho khách hàng?',
          header: 'Xác nhận hoàn tiền',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            this.confirmRefund();
          }
      });
  }

    async confirmRefund() {
      this.loading =true;
      this.isShowRefundDetail = false;
      await this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/refund/confirm?code='+this.refundSelected.code
                    ,
                { headers: this.header }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Xác nhận hoàn tiền thành công',
                        });
                        this.loadData();
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                        this.isShowRefundDetail = true;
                    }
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                    this.isShowRefundDetail = true;
                }
            );
        this.loading = false;

    }
}

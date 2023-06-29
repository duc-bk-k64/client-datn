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
  selector: 'app-refund-user',
  templateUrl: './refund-user.component.html'
})
export class RefundUserComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;


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
  listBill: any[] = [];
  // refundSelected: any;
  // isShowRefundDetail: boolean = false;
  // profile: Profile = {};
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
  applyFilterGlobal2($event: any, stringVal: any) {
    this.dt2!.filterGlobal(
        ($event.target as HTMLInputElement).value,
        stringVal
    );
}
  loadData() {
      this.http
          .get<ResponseMessage>(environment.backendApiUrl+'/api/v1/project/refund/findByAccount?username='+this.authService.getUsername(), {
              headers: this.header,
          })
          .subscribe(
              (data) => {
                  if (data.resultCode == 0) {
                      this.listRefund = data.data;
                      // console.log(this.listRefund);
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
          this.http
          .get<ResponseMessage>(environment.backendApiUrl+'/api/v1/project/bill/findByAccount?username='+this.authService.getUsername(), {
              headers: this.header,
          })
          .subscribe(
              (data) => {
                  if (data.resultCode == 0) {
                      this.listBill = data.data;
                      // console.log(this.listBill);
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
 
}

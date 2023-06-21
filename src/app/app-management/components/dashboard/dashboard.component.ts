import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewInit,
    ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription, async } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { AuthService } from '../../service/auth.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ResponseMessage } from '../../Model/ResponseMessage';
import { Table } from 'primeng/table';

@Component({
    templateUrl: './dashboard.component.html',
    styles: [],
})
export class DashboardComponent implements OnInit {
    @ViewChild('dt1') dt1: Table | undefined;
    items!: MenuItem[];

    // products!: Product[];

    chartData: any;

    chartOptions: any;

    totalIn: number = 0;
    totalOut: number = 0;
    totalBooktour: number = 0;

    subscription!: Subscription;
    header: any;
    listTransaction: any[] = [];
    statisticIn: number[] = [];
    statisticOut: number[] = [];
    dataStatisticIn: any[] = [];
    dataStatisticOut: any[] = [];
    listDay: number[] = [3, 5, 7, 10, 30];
    listDayTransaction: any[] = [
        { name: '1', value: 1 },
        { name: '3', value: 3 },
        { name: '5', value: 5 },
        { name: '10', value: 10 },
        { name: '30', value: 30 },
        { name: 'Tất cả', value: -1 },
    ];
    listStatus: any[]=[
        {
            name:'Thu',
            value:'in'
        },
        {
            name:'Chi',
            value:'out'
        }
    ]
    transaction: any = {
        totalMoney: 0,
        createdBy:this.authService.getUsername(),
        type: '',
        content:''
    }
    isShowCreate: boolean = false;
    day: number = 3;

    dayTransaction: number = -1;
    chartLabel: string[] = [];
    applyFilterGlobal($event: any, stringVal: any) {
        this.dt1!.filterGlobal(
            ($event.target as HTMLInputElement).value,
            stringVal
        );
    }

    constructor(
        public layoutService: LayoutService,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.header = new HttpHeaders().set(
            storageKey.AUTHORIZATION,
            this.authService.getToken()
        );
        this.loadData();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' },
        ];
    }
    loadTransaction() {
        if(this.dayTransaction == -1) {
            this.http
            .get<ResponseMessage>('/api/v1/project/transaction/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTransaction = data.data;
                        // console.log(this.listTransaction);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                    }
                    // console.log(data);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        } else {
            this.http
            .get<ResponseMessage>('/api/v1/project/transaction/findAllByTime?day='+this.dayTransaction, {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTransaction = data.data;
                        // console.log(this.listTransaction);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                    }
                    // console.log(data);
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
    loadData() {
         // load total booktour
         this.http
         .get<ResponseMessage>('/api/v1/project/booktour/totalOneDay', {
             headers: this.header,
         })
         .subscribe(
             (data) => {
                 if (data.resultCode == 0) {
                     this.totalBooktour = data.data;
                     // console.log(this.listTransaction);
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
        // load total in
        this.http
        .get<ResponseMessage>('/api/v1/project/transaction/totalInOneDay', {
            headers: this.header,
        })
        .subscribe(
            (data) => {
                if (data.resultCode == 0) {
                    this.totalIn = data.data;
                    // console.log(this.listTransaction);
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
          // load total Out
          this.http
          .get<ResponseMessage>('/api/v1/project/transaction/totalOutOneDay', {
              headers: this.header,
          })
          .subscribe(
              (data) => {
                  if (data.resultCode == 0) {
                      this.totalOut = data.data;
                      // console.log(this.listTransaction);
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
        //   total transaction
        this.http
            .get<ResponseMessage>('/api/v1/project/transaction/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTransaction = data.data;
                        // console.log(this.listTransaction);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                    }
                    // console.log(data);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.loadStatistic(this.day);
    }

    async loadStatistic(days: number) {
        await this.http
            .get<ResponseMessage>(
                '/api/v1/project/transaction/statisticInByTime?day=' + days,
                {
                    headers: this.header,
                }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.dataStatisticIn = data.data;
                        console.log(this.dataStatisticIn);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                    // console.log(data);
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
                '/api/v1/project/transaction/statisticOutByTime?day=' + days,
                {
                    headers: this.header,
                }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        this.dataStatisticOut = data.data;
                        console.log(this.dataStatisticOut);
                    } else {
                        this.messageService.add({
                            severity: 'error',
                            summary: data?.message,
                        });
                    }
                    // console.log(data);
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error occur',
                    });
                }
            );
        this.initChart();
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder =
            documentStyle.getPropertyValue('--surface-border');
        this.chartLabel = [];
        this.statisticIn = [];
        this.statisticOut = [];
        for (let i = 0; i < this.dataStatisticIn.length; i++) {
            this.chartLabel.push(this.dataStatisticIn[i].day);
            this.statisticIn.push(this.dataStatisticIn[i].value);
            this.statisticOut.push(this.dataStatisticOut[i].value);
        }
        console.log(this.chartLabel);
        console.log(this.statisticIn);
        console.log(this.statisticOut);
        this.chartData = {
            labels: this.chartLabel,
            datasets: [
                {
                    label: 'Thu',
                    data: this.statisticIn,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor:
                        documentStyle.getPropertyValue('--bluegray-700'),
                    tension: 0.4,
                },
                {
                    label: 'Chi',
                    data: this.statisticOut,
                    fill: false,
                    backgroundColor:
                        documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: 0.4,
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
                y: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false,
                    },
                },
            },
        };
    }
    showCreate() {
        this.isShowCreate = true;
        this.transaction = {
            totalMoney: 0,
            createdBy:this.authService.getUsername(),
            type: '',
            content:''
        }
    }
    async create() {
     await this.http
        .post<ResponseMessage>(
            '/api/v1/project/transaction/create',this.transaction,
            {
                headers: this.header,
            }
        )
        .toPromise()
        .then(
            (data) => {
                if (data?.resultCode == 0) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Tạo giao dịch thành công',
                    });
                    this.isShowCreate = false;
                    this.loadData();
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: data?.message,
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

    // connectWebsocket() {
    //     console.log("Initialize WebSocket Connection");
    //     let topic = "/user/"+this.authService.getUsername() + "/queue/reply";
    //     let ws = new SockJS(this.webSocketEndPoint);
    //     this.stompClient = Stomp.over(ws);
    //     const _this = this;
    //     _this.stompClient.connect({}, function (frame:any) {
    //         _this.stompClient.subscribe(topic, function (sdkEvent:any) {
    //            console.log(sdkEvent);
    //         });
    //         //_this.stompClient.reconnect_delay = 2000;
    //     }, this.errorCallBack);

    // }
    // errorCallBack(error:any) {
    //     console.log("errorCallBack -> " + error)
    //     setTimeout(() => {
    //         this.connectWebsocket();
    //     }, 5000);
    // }
}

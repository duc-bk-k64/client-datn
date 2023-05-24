
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { AuthService } from '../../service/auth.service';

@Component({
    templateUrl: './dashboard.component.html',
    styles :[]
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;
    header: any;

    constructor( public layoutService: LayoutService,private messageService: MessageService, private http: HttpClient, private  authService: AuthService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
    }
    ngAfterViewInit() {
        // window.location.reload();
    }

    ngOnInit() {
        this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
        this.initChart();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        
    
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    showToast()  {
        this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
    }
    testUser() {
        // console.log(this.header)
        this.http.get<any>("/api/v1/project/",{headers:this.header}).subscribe(
            data => {
                console.log(data);
            }
        )
    }
    testAdmin() {
        this.http.get<any>("/api/v1/project/abc",{headers:this.header}).subscribe(
            data => {
                console.log(data);
            }
        )
    }
}

import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../app-management/service/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.loadModel();
        
       
    }
    loadModel() {
        let role = this.authService.getRole();
        if(role == "ROLE_ADMIN") {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
               
                {
                    label: 'Admin',
                    icon: 'pi pi-fw pi-briefcase',
                    // routerLink: ['/pages'],
                    items: [
                       
                        {
                            label: 'Quản lý tour',
                            icon: 'pi pi-fw pi-car',
                            routerLink: ['/pages/manageTour']
                        },
                        {
                            label: 'Quản lý bài viết',
                            icon: 'pi pi-fw pi-server',
                            routerLink: ['/pages/managePost']
                        },
                        {
                            label: 'Quản lý đặt tour',
                            icon: 'pi pi-fw pi-shopping-cart',
                            routerLink: ['/pages/manageBooktour']
                        },
                        {
                            label: 'Quản lý hoàn tiền',
                            icon: 'pi pi-fw pi-money-bill',
                            routerLink: ['/pages/manageRefund']
                        },
                        {
                            label: 'Quản lý tài khoản',
                            icon: 'pi pi-fw pi-users',
                            routerLink: ['/pages/manageAccount']
                        },
                        {
                            label: 'Hỗ trợ khách hàng',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/pages/reply']
                        },
                      
                    ]
                },
             
            ];

        } else if(role == "ROLE_STAFF") {
            this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
               
                {
                    label: 'Nhân viên',
                    icon: 'pi pi-fw pi-briefcase',
                    // routerLink: ['/pages'],
                    items: [
                       
                        {
                            label: 'Quản lý tour',
                            icon: 'pi pi-fw pi-car',
                            routerLink: ['/pages/manageTour']
                        },
                        {
                            label: 'Quản lý bài viết',
                            icon: 'pi pi-fw pi-server',
                            routerLink: ['/pages/managePost']
                        },
                        {
                            label: 'Quản lý đặt tour',
                            icon: 'pi pi-fw pi-shopping-cart',
                            routerLink: ['/pages/manageBooktour']
                        },
                        {
                            label: 'Quản lý hoàn tiền',
                            icon: 'pi pi-fw pi-money-bill',
                            routerLink: ['/pages/manageRefund']
                        },
                        {
                            label: 'Hỗ trợ khách hàng',
                            icon: 'pi pi-fw pi-comments',
                            routerLink: ['/pages/reply']
                        },
                       
                      
                    ]
                },
             
            ];
        } else if (role == "ROLE_TOURGUIDE") {
            this.model = [
              
               
                {
                    label: 'Hướng dẫn viên',
                    icon: 'pi pi-fw pi-briefcase',
                    // routerLink: ['/pages'],
                    items: [
                       
                        {
                            label: 'Danh sách chuyến đi',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/home-tourguide']
                        }
                       
                      
                    ]
                },
             
            ];

        } else if(role == "ROLE_USER") {
            this.model = [
              
               
                {
                    label: "Khách hàng",
                    icon: 'pi pi-fw pi-briefcase',
                    // routerLink: ['/pages'],
                    items: [
                       
                        {
                            label: 'Danh sách  tour',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/home-user']
                        },
                        {
                            label: 'Hóa đơn và hoàn tiền',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/refund']
                        },
                        {
                            label: 'Hỗ trợ',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/question']
                        },
                       
                      
                    ]
                },
             
            ];
           
        }
          
    }
}

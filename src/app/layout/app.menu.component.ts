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
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageTour']
                        },
                        {
                            label: 'Quản lý bài viết',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/managePost']
                        },
                        {
                            label: 'Quản lý đặt tour',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageBooktour']
                        },
                        {
                            label: 'Quản lý hoàn tiền',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageRefund']
                        },
                        {
                            label: 'Quản lý tài khoản',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageAccount']
                        }
                      
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
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageTour']
                        },
                        {
                            label: 'Quản lý bài viết',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/managePost']
                        },
                        {
                            label: 'Quản lý đặt tour',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageBooktour']
                        },
                        {
                            label: 'Quản lý hoàn tiền',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/manageRefund']
                        }
                       
                      
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
                            label: 'Danh sách  tour',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/tour']
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
                        }
                       
                      
                    ]
                },
             
            ];
           
        }
          
    }
}

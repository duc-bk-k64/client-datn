import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,private router: Router) { }

    ngOnInit() {
        this.loadModel();
        
       
    }
    loadModel() {
        let role = localStorage.getItem("role");
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
                            label: 'Account Management',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/account']
                        },
                        {
                            label: 'Exam List',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/examclass']
                        },
                        {
                            label: 'Subject management',
                            icon: 'pi pi-fw pi-sign-in',
                            routerLink: ['/pages/subject']
                        }
                      
                    ]
                },
             
            ];
    }
}

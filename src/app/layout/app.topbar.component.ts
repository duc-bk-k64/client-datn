import { async } from 'rxjs';
import { Notification } from './../app-management/Model/Notification';

import { AuthService } from 'src/app/app-management/service/auth.service';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { STATUS, storageKey } from '../app-constant';
import { ResponseMessage} from '../app-management/Model/ResponseMessage';
import { Router } from '@angular/router';
import { Profile } from '../app-management/Model/Profile';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles : [`
        p:hover {
            background-color:rgb(222, 228, 228);
        }

    `]
})
export class AppTopBarComponent implements OnInit {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

      
    //websocket
    webSocketEndPoint: string = 'http://localhost:8080/ws';

    stompClient: any;

    header:any;

    constructor(public layoutService: LayoutService,private router: Router,private authService: AuthService,private http: HttpClient,private messageService: MessageService) { }
    ngOnInit() {
    //    this.username=this.authService.getUsername();
       this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
       this.connectWebsocket();
       if(this.authService.getRole() =='ROLE_STAFF'||this.authService.getRole() =='ROLE_ADMIN') {
        this.connectWebsocketStaff();
       }
       this.loadNotification();
    }
    isShowDialog: boolean = false;
    isShowNotification: boolean = false;
    isShowNotifiDetail:boolean = false;
    position: string ='top-right';
    newNotifi: number = 0;
    notifications : Notification[] = [];
    selectedNotifi: Notification = {};
    profile: Profile = {};
    username: String = this.authService.getUsername();
    isShowUpdateProfile: boolean = false;
    sex: any = [
        {
            name: 'Nam',
            value: 'male'
        },
        {
            name: 'Nữ',
            value: 'female'
        }
    ]
    showDialog() {
        this.isShowDialog=true;
        this.http.get<ResponseMessage>("/api/v1/project/getProfile?username="+this.authService.getUsername(),{headers:this.header}).subscribe(
            data => {
                if(data.resultCode == 0) {
                   this.profile = data.data;
                //    console.log(this.profile)

                } else {
                    this.messageService.add({severity:'error', summary:"Error occur"});
                }
            }
        );
    }
    showNotification() {
        this.newNotifi = 0;
        this.isShowNotification = true;

    }

    connectWebsocket() {
        console.log("Initialize WebSocket Connection");
        let topic = "/user/"+this.authService.getUsername() + "/queue/reply";
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(topic, function (sdkEvent:any) {
                // console.log(sdkEvent)
                // console.log("abcd")
               _this.newNotifi = 1;
               _this.messageService.add({severity:'success', summary:"Thông báo mới", detail:sdkEvent.body});
               _this.loadNotification();
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);

    }
    errorCallBack(error:any) {
        console.log("errorCallBack -> " + error)
        setTimeout(() => {
            this.connectWebsocket();
        }, 5000);
    } 

    connectWebsocketStaff() {
        // console.log("Initialize WebSocket Connection");
        let topic = "/topic/staff";
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        _this.stompClient.connect({}, function (frame:any) {
            _this.stompClient.subscribe(topic, function (sdkEvent:any) {
                // console.log(sdkEvent)
                // console.log("abcd")
               _this.newNotifi = 1;
               _this.messageService.add({severity:'success', summary:"Thông báo mới", detail:sdkEvent.body});
               _this.loadNotification();
            });
            //_this.stompClient.reconnect_delay = 2000;
        }, this.errorCallBack);

    }
  

    async loadNotification() {
        if(this.authService.getRole() == 'ROLE_STAFF' || this.authService.getRole() == 'ROLE_ADMIN') {
            await this.http.get<ResponseMessage>("/api/v1/project/notifi/findByUsername?username=SYSTEM",{headers:this.header}).toPromise().then(
                data => {
                    if(data?.resultCode == 0) {
                        this.notifications = data.data;
                    //  for(let i = 0;i<this.notifications.length;i++) {
                    //     if(this.notifications[i].status == STATUS.UNREAD) {
                    //         this.newNotifi = 1;
                    //         break;
                    //     }
                    //  }
    
                    } else {
                        this.messageService.add({severity:'error', summary:data?.message});
                    }
                
    
                },
                error => {
                    this.messageService.add({severity:'error', summary:'Error occur'});
                }
            )
        }
        await this.http.get<ResponseMessage>("/api/v1/project/notifi/findByUsername?username="+this.authService.getUsername(),{headers:this.header}).toPromise().then(
            data => {
                if(data?.resultCode == 0) {
                   this.notifications= this.notifications.concat(data.data);
                    // console.log(data)
                    // console.log(this.notifications)
                 for(let i = 0;i<this.notifications.length;i++) {
                    if(this.notifications[i].status == STATUS.UNREAD) {
                        this.newNotifi = 1;
                        break;
                    }
                 }

                } else {
                    this.messageService.add({severity:'error', summary:data?.message});
                }
            

            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )

    } 
    detailNotification(object: any) {
        this.isShowNotification = false;
        // this.router.navigate(["/pages/empty"])
        this.isShowNotifiDetail = true;
        this.selectedNotifi = object;
        this.http.put<ResponseMessage>("/api/v1/project/notifi/read?id="+object.id,null,{headers:this.header}).subscribe(
            data => {
                // console.log(data)
            }
        );
        object.status = STATUS.READED;
    }
    async logout() {
        await this.http.post<ResponseMessage>("/api/v1/project/logout",null,{headers:this.header}).toPromise().then(
            data => {
                if(data?.resultCode == 0) {
                    // console.log(data)
                    this.authService.setToken("");
                    this.router.navigate(["/auth/login"]);
                }
                else {
                    console.log(data)
                }
                
            }
        );
    }

    showUpdateProfile() {
        this.isShowUpdateProfile = true;
    }
    async updateProfile() {
        await this.http.put<ResponseMessage>("/api/v1/project/updateProfile?username="+this.authService.getUsername(),this.profile,{headers:this.header}).toPromise().then(
            data => {
                if(data?.resultCode == 0) {
                    this.messageService.add({severity:'success', summary:'Cập nhật thành công'});
                    this.isShowUpdateProfile = false;
                 }

                else {
                    this.messageService.add({severity:'error', summary:data?.message});
                }
            

            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )

    }
}

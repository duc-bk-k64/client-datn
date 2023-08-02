import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { storageKey } from 'src/app/app-constant';
import { Chat } from 'src/app/app-management/Model/Chat';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-reply-staff',
    templateUrl: './reply-staff.component.html',
})
export class ReplyStaffComponent implements OnInit {
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
    listThread: any[] = [];
    threadSelected: any;
    chatData: any[] = [];
    showChat: boolean = false;
    user: any = {
        avatar: 'assets/layout/images/userAvatar.png',
    };
    staff: any = {
        avatar: 'assets/layout/images/staffAvatar.png',
    };

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
            .get<ResponseMessage>(environment.backendApiUrl+'/api/v1/project/thread/findAll', {
                headers: this.header,
            })
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listThread = data.data;
                        // console.log(this.listThread);
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
    showChatDialog(object: any) {
        this.threadSelected = object;
        this.showChat = true;
        this.chatData = [];
        for (let i = 0; i < this.threadSelected.questions.length; i++) {
            let question = {
                text: this.threadSelected.questions[i].content,
                reply: false,
                user: this.user,
                name: 'Khách hàng',
                timeCreated: new Date(this.threadSelected.questions[i].timeCreated*1000),
            };
            this.chatData.push(question);
        }
        for (let i = 0; i < this.threadSelected.replies.length; i++) {
            let question = {
                text: this.threadSelected.replies[i].content,
                reply: true,
                user: this.staff,
                name: 'Bạn',
                timeCreated: new Date(this.threadSelected.replies[i].timeCreated*1000),
            };
            this.chatData.push(question);
        }
        this.chatData.sort((a, b) => (a.timeCreated < b.timeCreated ? -1 : 1));
        // console.log(this.chatData)
    }

    async reply(event: any) {
        this.loading = true;
        await this.http
            .post<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/reply/create?threadId=' +
                    this.threadSelected.id,
                {
                    content: event.message,
                    timeCreated: '2023-06-21T12:44:45.509Z',
                    createdBy: this.authService.getUsername(),
                },
                {
                    headers: this.header,
                }
            )
            .toPromise()
            .then(
                (data) => {
                    if (data?.resultCode == 0) {
                        let question = {
                            text: event.message,
                            reply: true,
                            user: this.staff,
                            name: 'Bạn',
                            // timeCreated: this.threadSelected.replies[i].timeCreated,
                        };
                        this.chatData.push(question);
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
}

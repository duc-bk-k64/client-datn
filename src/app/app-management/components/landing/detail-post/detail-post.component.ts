import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { environment } from 'src/environments/environment.prod';

@Component({
    selector: 'app-detail-post',
    templateUrl: './detail-post.component.html',
    styles: [
        `
            #hero {
                background: linear-gradient(
                        0deg,
                        rgba(255, 255, 255, 0.2),
                        rgba(255, 255, 255, 0.2)
                    ),
                    radial-gradient(
                        77.36% 256.97% at 77.36% 57.52%,
                        #eeefaf 0%,
                        #c3e3fa 100%
                    );
                height: 700px;
                overflow: hidden;
            }

            .pricing-card:hover {
                border: 2px solid var(--cyan-200) !important;
            }

            @media screen and (min-width: 768px) {
                #hero {
                    -webkit-clip-path: ellipse(150% 87% at 93% 13%);
                    clip-path: ellipse(150% 87% at 93% 13%);
                    height: 530px;
                }
            }

            @media screen and (min-width: 1300px) {
                #hero > img {
                    position: absolute;
                    transform: scale(1.2);
                    top: 15%;
                }

                #hero > div > p {
                    max-width: 450px;
                }
            }

            @media screen and (max-width: 1300px) {
                #hero {
                    height: 600px;
                }

                #hero > img {
                    position: static;
                    transform: scale(1);
                    margin-left: auto;
                }

                #hero > div {
                    width: 100%;
                }

                #hero > div > p {
                    width: 100%;
                    max-width: 100%;
                }
            }
        `,
    ],
})
export class DetailPostComponent implements OnInit {
    loading: boolean = false;
    postId: number = -1;
    listParagraph: any[] = [];
    post: any;
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService
    ) {}
    ngOnInit() {
        this.postId = this.route.snapshot.params['id'];
        this.loadData();
        // console.log(this.postId);
    }
    login() {
        this.router.navigate(['/auth/login']);
    }
    register() {
        this.router.navigate(['/auth/signup']);
    }
    loadData() {
      this.http
            .get<ResponseMessage>(environment.backendApiUrl+
                '/api/v1/project/auth/paragraph/findByPostId?postId=' +
                    this.postId
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listParagraph = data.data;
                        // console.log(this.listParagraph);
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
                '/api/v1/project/auth/post/findById?id=' +
                    this.postId
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.post= data.data;
                        // console.log(this.post);
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
}

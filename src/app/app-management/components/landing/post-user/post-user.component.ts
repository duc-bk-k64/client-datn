import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-post-user',
    templateUrl: './post-user.component.html',
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
export class PostUserComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        public layoutService: LayoutService,
        public router: Router,
        private messageService: MessageService,
        private http: HttpClient,
        private authService: AuthService
    ) {}

    desId: number = -1;
    loading: boolean = false;
    desName: any;
    listTour: Tour[] = [];
    listPost: any[] = [];

    ngOnInit() {
        this.desId = this.route.snapshot.params['desId'];
        this.desName = localStorage.getItem('desName');
        this.loadData();
        //  console.log(this.desId)
    }
    login() {
        this.router.navigate(['/auth/login']);
    }
    register() {
        this.router.navigate(['/auth/signup']);
    }
    loadData() {
        this.http
            .get<ResponseMessage>(
                '/api/v1/project/auth/tour/findTourByDesId?desId=' + this.desId
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listTour = data.data;
                        // console.log(this.listTour);
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
            .get<ResponseMessage>(
                '/api/v1/project/auth/post/findByDestiantion?desId=' +
                    this.desId
            )
            .subscribe(
                (data) => {
                    if (data.resultCode == 0) {
                        this.listPost = data.data;
                        // console.log(this.listPost);
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
    detailTour(object: any) {
        this.router.navigate([
            'landing/detailTour/' + object.id + '/' + object.code,
        ]);
    }
    detailPost(object: any) {
      this.router.navigate([
        'landing/detailPost/' + object.id
      ])
    }
}

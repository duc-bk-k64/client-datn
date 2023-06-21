import { async } from 'rxjs';

import { AuthService } from './../../../service/auth.service';
import { getServerApiUrl, storageKey } from './../../../../app-constant';
import {
    Component,
    EventEmitter,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpClient } from '@angular/common/http';
import { SecureStorageService } from 'src/app/app-management/storage/secure-storage.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import {
    FacebookLoginProvider,
    GoogleLoginProvider,
    SocialAuthService,
} from 'angularx-social-login';
declare var google: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
            * {
                box-sizing: border-box;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    password: any;
    username: any;
    rememberMe: boolean = false;
    loading: boolean = false;
    access_token: string = '';
    socialUser: any;
    isError: boolean = true;
    email: string = '';
    name: string = '';
    // token_change : EventEmitter<any> = new EventEmitter();

    constructor(
        private authSocialService: SocialAuthService,
        public layoutService: LayoutService,
        private messageService: MessageService,
        private authService: AuthService,
        private router: Router,
        public httpClient: HttpClient,
        public secureStorageService: SecureStorageService
    ) {}

    ngOnInit(): void {
        google.accounts.id.initialize({
            client_id:
                '447143817673-kakprgbhain4331qff59tra446bfqd90.apps.googleusercontent.com',
            callback: async (response: any) => {
                console.log(response);
                this.loading = true;
                await this.httpClient
                    .post<any>(
                        'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' +
                            response.credential,
                        null
                    )
                    .toPromise()
                    .then(
                        (data) => {
                            this.isError = false;
                            this.email = data.email;
                            this.name = data.name;
                            // console.log(data);
                        },
                        (error) => {
                            this.isError = true;
                            this.messageService.add({
                                severity: 'error',
                                summary: 'Error when login with Google',
                            });
                            // console.log(error)
                        }
                    );
                if (!this.isError) {
                    await this.httpClient
                        .post<any>('/api/v1/project/auth/loginGoogle', {
                            credential: response.credential,
                            email: this.email,
                            name: this.name,
                        })
                        .toPromise()
                        .then(
                            (data) => {
                                // console.log(data);
                                if (data.resultCode == '0') {
                                    //   console.log(data.data)
                                    this.authService.setToken(data.data);
                                    this.authService.setUsername(this.email);
                                    this.authService.setRole('ROLE_USER');
                                    // console.log("abcd")
                                    // console.log(this.authService.getRedirectUrl())
                                    if (this.authService.getRedirectUrl().includes('bookTour'))
                                        this.router
                                            .navigate([
                                                this.authService.getRedirectUrl(),
                                            ])
                                            .then(() => {
                                                window.location.reload();
                                            });
                                    else
                                    // console.log(this.authService.getRedirectUrl())
                                        this.router
                                            .navigate(['pages/home-user'])
                                            .then(() => {
                                                window.location.reload();
                                            });
                                } else
                                    this.messageService.add({
                                        severity: 'error',
                                        summary: data.message,
                                    });
                            },
                            (error) => {
                                this.messageService.add({
                                    severity: 'error',
                                    summary: 'Error when login with Google',
                                });
                            }
                        );
                } else
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error when login with Google',
                    });
                this.loading = false;
            },
        });
        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: 'outline', size: 'large' } // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog
    }

    async login() {
        this.loading = true;
        await this.httpClient
            .post<any>('/api/v1/project/auth/signin', {
                userName: this.username,
                passWord: this.password,
            })
            .toPromise()
            .then(
                (data) => {
                    if (data.resultCode == '0') {
                        this.authService.setToken(data.data.token);
                        this.authService.setUsername(data.data.username);
                        // console.log(this.authService.getUsername())
                        this.authService.setRole(data.data.role);
                        if (data.data.role == 'ROLE_USER') {
                            if (this.authService.getRedirectUrl().includes('bookTour'))
                                this.router.navigate([
                                    this.authService.getRedirectUrl(),
                                ]);
                            else this.router.navigate(['pages/home-user']);
                        } else
                            this.router.navigate([
                                this.authService.getRedirectUrl(),
                            ]);
                        // console.log(data)
                    } else
                        this.messageService.add({
                            severity: 'error',
                            summary: data.message,
                        });
                },
                (error) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Username or password incorrect',
                    });
                }
            );
        this.loading = false;
    }

    async loginWithGoogle() {
        // console.log(this.authSocialService.signIn);
        await this.authSocialService
            .signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((data) => {
                console.log(data);
            });
        // console.log(this.access_token)
    }
    async loginWithFacebook() {
        // console.log(this.authSocialService);
        await this.authSocialService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then(
                (data) => {
                    this.socialUser = data;
                    this.isError = false;
                    console.log(data);
                },
                (error) => {
                    this.isError = true;
                }
            );
        if (!this.isError) {
            this.loading = true;
            await this.httpClient
                .post<any>('/api/v1/project/auth/loginFacebook', {
                    id: this.socialUser.id,
                    authToken: this.socialUser.authToken,
                    name: this.socialUser.name,
                    email: this.socialUser.email,
                })
                .toPromise()
                .then(
                    (data) => {
                        if (data.resultCode == '0') {
                            this.authService.setToken(data.data);
                            this.authService.setUsername(this.socialUser.id);
                            this.authService.setRole('ROLE_USER');
                            if (this.authService.getRedirectUrl().includes('bookTour'))
                                this.router.navigate([
                                    this.authService.getRedirectUrl(),
                                ]);
                            else this.router.navigate(['pages/home-user']);
                        } else
                            this.messageService.add({
                                severity: 'error',
                                summary: data.message,
                            });
                    },
                    (error) => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error when login with facebook',
                        });
                    }
                );
            this.loading = false;
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error when login with facebook',
            });
        }
    }
}

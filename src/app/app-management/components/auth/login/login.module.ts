
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { PagesModule } from '../../pages/pages.module';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        PagesModule,
        SocialLoginModule

    ],
    declarations: [LoginComponent],
    providers : [
      
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  // "447143817673-kakprgbhain4331qff59tra446bfqd90.apps.googleusercontent.com"
                  "857554650091-0o366gb7kser6oc71t2n0crqkg5lo3sb.apps.googleusercontent.com"
                )
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider(
                  '1993019264369427'
                  // '614883240530254'
                  ),
              },
             
            ],
          } as SocialAuthServiceConfig,
        },
    ]
    ,
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],

})
export class LoginModule { }

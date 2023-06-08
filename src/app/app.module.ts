import { AuthGuardAdmin } from './app-management/service/authGuard-Admin';
import { PagesModule } from './app-management/components/pages/pages.module';
import { AuthGuard } from './app-management/service/auth-guard';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { DynamicDialogModule,DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogService } from 'primeng/dynamicdialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule ,ReactiveFormsModule,} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastModule } from 'primeng/toast';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig,SocialLoginModule } from 'angularx-social-login';
import { AuthGuardStaff } from './app-management/service/authGuard-Staff';
import { AuthGuardTourGuide } from './app-management/service/authGuard-Tourguide';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        ButtonModule,
        DynamicDialogModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatDialogModule,
        RadioButtonModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        ImageModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        ToastModule,
        ProgressSpinnerModule,
        PagesModule,
        // SocialLoginModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
      AuthGuard,AuthGuardAdmin,AuthGuardStaff,AuthGuardTourGuide,JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        MessageService,ConfirmationService, {
            provide: DynamicDialogRef,
            useValue: {}
          },
          DialogService,
          // {
          //   provide: 'SocialAuthServiceConfig',
          //   useValue: {
          //     autoLogin: false,
          //     providers: [
          //       {
          //         id: FacebookLoginProvider.PROVIDER_ID,
          //         provider: new FacebookLoginProvider('796009544943077'),
          //       },
          //       {
          //         id: GoogleLoginProvider.PROVIDER_ID,
          //         provider: new GoogleLoginProvider(
          //           "447143817673-kakprgbhain4331qff59tra446bfqd90.apps.googleusercontent.com"
          //         )
          //       }
          //     ],
          //     onError: (err) => {
          //       console.error(err);
          //     }
          //   } as SocialAuthServiceConfig,
          // },
         
    ],
    bootstrap: [AppComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
      ],
})
export class AppModule { }

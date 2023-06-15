import { AppModule } from './../../../app.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PagesModule } from '../pages/pages.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ActiveAccountComponent } from './active-account/active-account.component';
@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ToastModule,
        PagesModule
    ],
    declarations: [
      ForgotPasswordComponent,
      ResetPasswordComponent,
      SignUpComponent,
      ActiveAccountComponent
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA
    ],
})
export class AuthModule { }

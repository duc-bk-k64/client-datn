import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ActiveAccountComponent } from './active-account/active-account.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'forgot-password', component:ForgotPasswordComponent},
        { path: 'reset-password',  component: ResetPasswordComponent},
        { path: 'signup', component: SignUpComponent},
        { path: 'active', component: ActiveAccountComponent}
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

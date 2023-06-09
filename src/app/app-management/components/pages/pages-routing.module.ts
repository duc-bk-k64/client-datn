
import { AuthGuardAdmin } from './../../service/authGuard-Admin';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListTourUserComponent } from './list-tour-user/list-tour-user.component';
import { AuthGuard } from '../../service/auth-guard';
import { ManageTourComponent } from './manage-tour/manage-tour.component';
import { AuthGuardStaff } from '../../service/authGuard-Staff';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageBooktourComponent } from './manage-booktour/manage-booktour.component';
import { ManageRefundComponent } from './manage-refund/manage-refund.component';
import { RefundUserComponent } from './refund-user/refund-user.component';
import { QuestionUserComponent } from './question-user/question-user.component';
import { ReplyStaffComponent } from './reply-staff/reply-staff.component';
import { HomeTourguideComponent } from './home-tourguide/home-tourguide.component';
import { AuthGuardTourGuide } from '../../service/authGuard-Tourguide';
import { ListBooktourComponent } from './list-booktour/list-booktour.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'home-user', component: ListTourUserComponent, canActivate:[AuthGuard]},
        { path: 'manageTour', component: ManageTourComponent, canActivate: [AuthGuard, AuthGuardStaff]},
        { path: 'managePost', component: ManagePostComponent, canActivate: [AuthGuard,AuthGuardStaff]},
        { path: 'manageAccount', component: ManageAccountComponent, canActivate:[AuthGuard,AuthGuardAdmin]},
        { path: 'manageBooktour', component: ManageBooktourComponent, canActivate:[AuthGuard,AuthGuardStaff]},
        { path: 'manageRefund', component: ManageRefundComponent, canActivate:[AuthGuard,AuthGuardStaff]},
        { path: 'refund', component:RefundUserComponent, canActivate: [AuthGuard]},
        { path: 'question', component:QuestionUserComponent, canActivate: [AuthGuard]},
        { path: 'reply' ,component:ReplyStaffComponent, canActivate: [AuthGuard,AuthGuardStaff]},
        { path: 'home-tourguide',component:HomeTourguideComponent, canActivate:[AuthGuard,AuthGuardTourGuide]},
        { path: 'list-booktour/:code',component:ListBooktourComponent,canActivate:[AuthGuard]}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

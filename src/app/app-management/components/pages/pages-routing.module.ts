
import { AuthGuardAdmin } from './../../service/authGuard-Admin';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListTourUserComponent } from './list-tour-user/list-tour-user.component';
import { AuthGuard } from '../../service/auth-guard';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'home-user', component: ListTourUserComponent, canActivate:[AuthGuard]}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

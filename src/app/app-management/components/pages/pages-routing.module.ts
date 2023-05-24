
import { AuthGuardAdmin } from './../../service/authGuard-Admin';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuardTeacher } from '../../service/authGuard-Teacher';
import { AuthGuardStudent } from '../../service/authGuard-Student';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

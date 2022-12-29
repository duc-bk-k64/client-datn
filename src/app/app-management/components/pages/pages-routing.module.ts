import { AccountManagementComponent } from './account-management/account-management.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'account', component:AccountManagementComponent}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

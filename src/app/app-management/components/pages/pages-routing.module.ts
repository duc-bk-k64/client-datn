import { ExamStatisticsComponent } from './exam-statistics/exam-statistics.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ExamclassDetailComponent } from './examclass-management/examclass-detail/examclass-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamclassManagementComponent } from './examclass-management/examclass-management.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'account', component:AccountManagementComponent},
        { path:'examclass',component:ExamclassManagementComponent},
        { path: 'exam-statistics', component: ExamStatisticsComponent },
        { path:'examclass/:id', component:ExamclassDetailComponent}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

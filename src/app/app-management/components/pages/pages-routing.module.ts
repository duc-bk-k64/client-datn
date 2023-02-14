import { ExamStatisticsComponent } from './exam-statistics/exam-statistics.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { ExamclassDetailComponent } from './examclass-management/examclass-detail/examclass-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExamclassManagementComponent } from './examclass-management/examclass-management.component';
import { ExamPointStatisticsComponent } from './exam-point-statistics/exam-point-statistics.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
@NgModule({
    imports: [RouterModule.forChild([
        { path: 'empty', loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'account', component:AccountManagementComponent},
        { path:'examclass',component:ExamclassManagementComponent},
        { path: 'exam-statistics', component: ExamStatisticsComponent },
        { path:'examclass/:id', component:ExamclassDetailComponent},
        {path : 'exam-point-statistics',component:ExamPointStatisticsComponent},
        {path : 'view-exam',component:ViewExamComponent},
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }

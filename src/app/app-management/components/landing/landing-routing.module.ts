import { AuthGuard } from './../../service/auth-guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DetailTourComponent } from './detail-tour/detail-tour.component';
import { PostUserComponent } from './post-user/post-user.component';
import { DetailPostComponent } from './detail-post/detail-post.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent },
        { path: 'detailTour/:id/:code', component: DetailTourComponent},
        { path: 'post/:desId', component: PostUserComponent},
        { path: 'detailPost/:id', component: DetailPostComponent}
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }

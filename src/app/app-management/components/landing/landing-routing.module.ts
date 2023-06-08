import { AuthGuard } from './../../service/auth-guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { DetailTourComponent } from './detail-tour/detail-tour.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: LandingComponent },
        { path: 'detailTour/:id/:code', component: DetailTourComponent}
    ])],
    exports: [RouterModule]
})
export class LandingRoutingModule { }

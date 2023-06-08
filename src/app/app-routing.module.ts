
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { AuthGuard } from './app-management/service/auth-guard';
import { BookTourComponent } from './app-management/components/landing/book-tour/book-tour.component';
import { AuthGuardStaff } from './app-management/service/authGuard-Staff';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./app-management/components/dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[AuthGuard,AuthGuardStaff] },
                    { path: 'pages', loadChildren: () => import('./app-management/components/pages/pages.module').then(m => m.PagesModule) ,canActivate:[AuthGuard]},
                    { path: 'bookTour/:tourId/:tripCode', component:BookTourComponent, canActivate:[AuthGuard]}
                ],
                canActivate:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./app-management/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./app-management/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
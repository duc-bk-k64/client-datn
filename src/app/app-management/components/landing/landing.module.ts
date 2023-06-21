import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { StyleClassModule } from 'primeng/styleclass';
import { DividerModule } from 'primeng/divider';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ImageModule } from 'primeng/image';
import { DetailTourComponent } from './detail-tour/detail-tour.component';
import { PagesModule } from '../pages/pages.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { BookTourComponent } from './book-tour/book-tour.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { RatingModule } from 'primeng/rating';
import { PostUserComponent } from './post-user/post-user.component';
import { DetailPostComponent } from './detail-post/detail-post.component';

@NgModule({
    imports: [
        CommonModule,
        LandingRoutingModule,
        DividerModule,
        StyleClassModule,
        ChartModule,
        PanelModule,
        ButtonModule,
        ToastModule,
        ImageModule,
        PagesModule,
        DropdownModule,
        FormsModule,
        DialogModule,
        InputTextModule,
        TableModule,
        TooltipModule,
        InputNumberModule,
        RatingModule
    ],
    declarations: [LandingComponent, DetailTourComponent, BookTourComponent, PostUserComponent, DetailPostComponent],
    providers:[MessageService]
})
export class LandingModule { }

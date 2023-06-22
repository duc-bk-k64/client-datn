
import { RadioButtonModule } from 'primeng/radiobutton';
import { ImageModule } from 'primeng/image';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {TooltipModule} from 'primeng/tooltip';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import {PasswordModule} from 'primeng/password';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { InputNumberModule } from 'primeng/inputnumber';
import {CalendarModule} from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingComponent } from './loading/loading.component';
import {ToggleButtonModule} from 'primeng/togglebutton';
import { environment } from 'src/environments/environment';
import {
    AngularFireStorageModule,
    AngularFireStorageReference,
    AngularFireUploadTask
} from "@angular/fire/compat/storage";
import  {AngularFireModule} from "@angular/fire/compat";
import { ListTourUserComponent } from './list-tour-user/list-tour-user.component';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ManageTourComponent } from './manage-tour/manage-tour.component';
import { ManagePostComponent } from './manage-post/manage-post.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { MenuModule } from 'primeng/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ManageBooktourComponent } from './manage-booktour/manage-booktour.component';
import { ManageRefundComponent } from './manage-refund/manage-refund.component';
import { RefundUserComponent } from './refund-user/refund-user.component';
import { NbChatModule } from '@nebular/theme';
import { QuestionUserComponent } from './question-user/question-user.component';
import { ReplyStaffComponent } from './reply-staff/reply-staff.component';
import { HomeTourguideComponent } from './home-tourguide/home-tourguide.component';
import { ListBooktourComponent } from './list-booktour/list-booktour.component';
@NgModule({
    declarations: [
            LoadingComponent,
            ListTourUserComponent,
            ManageTourComponent,
            ManagePostComponent,
            ManageAccountComponent,
            ManageBooktourComponent,
            ManageRefundComponent,
            RefundUserComponent,
            QuestionUserComponent,
            ReplyStaffComponent,
            HomeTourguideComponent,
            ListBooktourComponent,
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        CheckboxModule,
        ToastModule,
        TableModule,
        ButtonModule,
        ToolbarModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        TooltipModule,
        MultiSelectModule,
        ConfirmDialogModule,
        DropdownModule,
        PasswordModule,
        MatTableModule,
        MatCardModule,
        FormsModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        InputNumberModule,
        CalendarModule,
        CardModule,
        CascadeSelectModule,
        ChartModule,
        ProgressSpinnerModule,
        ToggleButtonModule,
        ImageModule,
        RadioButtonModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule,
        TagModule,
        RatingModule,
        InputTextareaModule,
        MenuModule,
        FileUploadModule,
        NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' })

    ],
    providers:[ConfirmationService],
    exports: [LoadingComponent]
})
export class PagesModule { }

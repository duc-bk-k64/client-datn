import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import {ToastModule} from 'primeng/toast';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
// import {AngularFireStorageModule} from '@angular/fire/storage'
// import {AngularFireModule} from '@angular/fire'
import {  storageKey } from 'src/app/app-constant';
import { TagModule } from 'primeng/tag';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        DashboardsRoutingModule,
        ToastModule,
        MessageModule,
        MessagesModule,
        DropdownModule,
        TagModule,
        InputTextModule,
        DialogModule,
        ToolbarModule,
        InputTextareaModule,
        InputNumberModule
        // AngularFireModule.initializeApp(storageKey.firebaseConfig),
        // AngularFireStorageModule 
    ],
    declarations: [DashboardComponent],
    providers: [MessageService]
})
export class DashboardModule { }

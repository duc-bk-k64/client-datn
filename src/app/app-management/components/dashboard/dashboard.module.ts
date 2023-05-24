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
// import {AngularFireStorageModule} from '@angular/fire/storage'
// import {AngularFireModule} from '@angular/fire'
import {  storageKey } from 'src/app/app-constant';
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
        // AngularFireModule.initializeApp(storageKey.firebaseConfig),
        // AngularFireStorageModule 
    ],
    declarations: [DashboardComponent],
    providers: [MessageService]
})
export class DashboardModule { }

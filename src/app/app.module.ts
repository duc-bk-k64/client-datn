import { AuthGuard } from './app-management/service/auth-guard';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './app-management/components/notfound/notfound.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OnlineExamComponent } from './app-management/components/online-exam/online-exam.component';
import {ButtonModule} from 'primeng/button';
import {RadioButtonModule} from 'primeng/radiobutton';
import {CheckboxModule} from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ImageModule} from 'primeng/image';
@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, OnlineExamComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CommonModule,
        ButtonModule,
        RadioButtonModule,
        CheckboxModule,
        FormsModule,
        InputTextModule,
        ImageModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
      AuthGuard,JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        MessageService,ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

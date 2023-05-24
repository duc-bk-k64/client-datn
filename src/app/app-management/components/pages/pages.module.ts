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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
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
@NgModule({
    declarations: [
            LoadingComponent,
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
    ],
    exports: [LoadingComponent]
})
export class PagesModule { }

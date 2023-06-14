import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        FileUploadModule
    ],
    declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }

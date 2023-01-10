import { Component, OnInit } from '@angular/core';
import { BaseClass } from 'src/app/BaseClass';
// import { BaseClass } from 'src/app/base-class';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field'
@Component({
  selector: 'app-examclass-management',
  templateUrl: './examclass-management.component.html',
  styleUrls: ['./examclass-management.component.scss']
})
export class ExamclassManagementComponent extends BaseClass implements OnInit {
  // filterExam: FormControl 
  header: any;

  listExam: any[] = [];
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ["name", "startTime", "endTime", "numberOfQuestion", "numberOfStudent"];
  dataTable: any = [];

  constructor(public service: ExamClassService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,
    ) {
    super()
  }

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
    this.getList()
    // this.getDS()
    // this.filterExam = new FormControl();
    // console.log(this.filterExam)
    // this.filterExam.valueChanges.subscribe(
    //   value => {
    //     this.listExam = this.listExam.filter(x =>{
    //       console.log(this.filterExam)
    //     }

    //     )
    // }
    // )
  }
  getList() {
    this.listExam = []
    this.service.getListExam().pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          console.log(rs)
          this.dataSource = rs.content
          this.dataTable = rs.content
          rs.content.map((e: any, i: any) => {
            this.listExam.push({
              ...e,
              view: ` ${e.name}`,
            });
          });
          console.log(this.dataSource)

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cập nhật thành công' });
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });

        }
      )
  }
  deleteExam(item: any) {
    this.service.deleteExam(item.id).pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công' });
          this.getList()
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });
        }

      )
    
  }
  // async getDS() {
  //  await this.httpClient.get<any>("/api/exam-classes",{headers: this.header}).toPromise().then(data => {
  //   console.log(data)
  //   this.messageService.add({severity:'success', summary: 'Success', detail: 'Cập nhật thành công'});
  //   // console.log(data)
  //  },
  //  error => {
  //   console.log(error)
  //   this.messageService.add({severity:'error', summary: 'Error', detail: 'Có lỗi xảy ra'});

  //  }
  //  )

  // }


}

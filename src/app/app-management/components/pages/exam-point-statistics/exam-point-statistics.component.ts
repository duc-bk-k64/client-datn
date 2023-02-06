import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { BaseClass } from 'src/app/BaseClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { StudentService} from 'src/app/app-management/service/student.service';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: 'app-exam-point-statistics',
  templateUrl: './exam-point-statistics.component.html',
  styleUrls: ['./exam-point-statistics.component.scss']
})
export class ExamPointStatisticsComponent extends BaseClass implements OnInit  {
  listSV:any[]=[];
  listSVSelected:any[]=[];
  header: any;
  listExam: any[] = [];
  dataTable: any = [];
  filterLopThi = new FormControl('');
  filteredLopThi: any = [];
  dsLopThi: any;
  constructor(public service: ExamClassService,public serviceSV: StudentService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,private route: ActivatedRoute) { 
    super()
  }

  ngOnInit(): void {
    this.getListSV(this.route.snapshot.params['id'])
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
  }
  getListSV(id:any){
    this.serviceSV.getListSV(id).pipe(this.unsubsribeOnDestroy)
  .subscribe(
    (rs: any) => {
      console.log(rs)
      
     this.listSV=rs
      
    },
  )
  }
  getList() {
    this.listExam = []
    this.service.getListExam().pipe(this.unsubsribeOnDestroy)
      .subscribe(
        (rs: any) => {
          console.log(rs)
          this.dataTable = rs.content
          rs.content.map((e: any,i:any) => {
            this.filteredLopThi.push({
              ...e,
              view: ` ${e.name}`,
            })
              if (rs.content?.length === i + 1) {
              this.dsLopThi = this.filteredLopThi;
          }
          });
         
          console.log(this.filteredLopThi)
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Lấy dữ liệu thành công' });
        },
        error => {
          console.log(error)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Có lỗi xảy ra' });

        }
      )
  }
}

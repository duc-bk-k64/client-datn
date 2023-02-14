import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { BaseClass } from 'src/app/BaseClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { StudentService} from 'src/app/app-management/service/student.service';
@Component({
  selector: 'app-dialog-add-student',
  templateUrl: './dialog-add-student.component.html',
  styleUrls: ['./dialog-add-student.component.scss']
})
export class DialogAddStudentComponent extends BaseClass implements OnInit  {
listAllSV:any[]=[]
  constructor(public serviceSV: StudentService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService,private route: ActivatedRoute) {
      super()
     }

  ngOnInit(): void {
    this.getList()
  }
  getList(){  
    this.serviceSV.getAllSV().pipe(this.unsubsribeOnDestroy)
    .subscribe(
      (rs: any) => {
        console.log(rs)
       this.listAllSV=rs
        
      },
    )} 
}

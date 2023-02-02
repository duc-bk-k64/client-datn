import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { BaseClass } from 'src/app/BaseClass';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
@Component({
  selector: 'app-examclass-detail',
  templateUrl: './examclass-detail.component.html',
  styleUrls: ['./examclass-detail.component.scss']
})
export class ExamclassDetailComponent extends BaseClass implements OnInit  {
  header: any;
  constructor(public service: ExamClassService, private httpClient: HttpClient, private router: Router, private messageService: MessageService,
    private authService: AuthService) { super();}

  ngOnInit(): void {
    
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION, this.authService.getToken());
  }
  getList(id:any){  
    this.service.getListQs(id).pipe(this.unsubsribeOnDestroy)
    .subscribe(
      (rs: any) => {
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Xóa thành công' });
        
      },
    )}
 
}

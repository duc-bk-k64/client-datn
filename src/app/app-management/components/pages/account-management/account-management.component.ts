import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { async } from 'rxjs';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html'
})
export class AccountManagementComponent implements OnInit {

  constructor(private authService: AuthService,private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }
  @ViewChild('dt1') dt1: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;

  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadAccount();

  }
  header: any;
  listAccount: any[] = [];
  listAccountStudent: any[] = [];
  listAccountAdminAndTeacher: any[] = [];
  accountStudentSelected: any[] = [];
  accountAdminAndTeacherSelected: any[] = [];
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  applyFilterGlobal2($event: any, stringVal: any) {
    this.dt2!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
 async loadAccount() {
     await this.httpClient.get<any>("/api/account-systems?page=0&size=100",{headers: this.header}).toPromise().then(data => {
      try {
        this.listAccount=data.content;
     } catch (error) {
         this.messageService.add({severity:data.title, summary:data.detail});
     }

     },
     error => {
      this.router.navigate(['/auth/error']);
     }
     );
     for(let i=0; i<this.listAccount.length; i++) {
      if(this.listAccount[i].roles == "STUDENT") this.listAccountStudent.push(this.listAccount[i]);
      else this.listAccountAdminAndTeacher.push(this.listAccount[i]);
     }

  }


}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styles: [
      `
          :host ::ng-deep .p-password input {
              width: 100%;
              padding: 1rem;
          }

          :host ::ng-deep .pi-eye {
              transform: scale(1.6);
              margin-right: 1rem;
              color: var(--primary-color) !important;
          }

          :host ::ng-deep .pi-eye-slash {
              transform: scale(1.6);
              margin-right: 1rem;
              color: var(--primary-color) !important;
          }
          * {
              box-sizing: border-box;
          }
      `,
  ],
})
export class ActiveAccountComponent implements OnInit {
  code: string = '';
  loading: boolean = false;

  constructor(private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }
  ngOnInit(){
  }
  async activeAccount () {
    this.loading = true;
    await this.httpClient.post<any>("/api/v1/project/auth/active?code="+this.code,null).toPromise().then(
      data => {
        if(data.resultCode == "0")
        this.router.navigate(['/auth/login']);
        else 
        this.messageService.add({severity:"error", summary:data.message});

      },
      error => {
        this.messageService.add({severity:"error", summary:'Đã xảy ra lỗi'});

      }
    )
    this.loading = false;
    
  }

}

import { async } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private httpClient: HttpClient,private router: Router,private messageService: MessageService) { }

  ngOnInit(): void {
  }
  email: any;
  loading: boolean = false;
  async forgotPassword () {
    this.loading = true;
    await this.httpClient.post<any>("/api/v1/project/auth/forgotpw",{userName:this.email}).toPromise().then(
      data => {
        if(data.resultCode == "0")
        this.router.navigate(['/auth/reset-password']);
        else 
        this.messageService.add({severity:"error", summary:data.message});

      },
      error => {
        this.messageService.add({severity:"error", summary:error.title});

      }
    )
    this.loading = false;
    
  }

}

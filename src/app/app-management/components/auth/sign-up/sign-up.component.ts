import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppRoutingUrl } from 'src/app/app-management/app-routing.url';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styles: [`
  :host ::ng-deep .p-password input {
      width: 100%;
      padding:1rem;
  }

  :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }

  :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
  }
`]
})
export class SignUpComponent implements OnInit {

    password: String = "";
    username: String = "";
    email: String = "";
    loading: boolean = false;

    constructor(private messageService: MessageService ,private router: Router,public httpClient: HttpClient) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
     async signup() {
        // console.log(this.rememberMe)
       this.loading = true;
       await this.httpClient.post<any>(environment.backendApiUrl+'/api/v1/project/auth/signup',{'userName':this.username,'passWord':this.password,"email":this.email}).toPromise().then(
           data => {
            if(data.resultCode == "0")
              {
                this.messageService.add({severity:"success", summary:"Sign up account successfully"});
                setTimeout( () => {
                  this.router.navigate(['/auth/login'])
                }, 2000 );
              }
            else 
                 this.messageService.add({severity:"error", summary:data.message});
            },
            error => {
                this.router.navigate([AppRoutingUrl.common.error])
            }
            
        )
        this.loading = false;
        

    }
}

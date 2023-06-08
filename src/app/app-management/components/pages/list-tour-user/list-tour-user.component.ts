import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { storageKey } from 'src/app/app-constant';
import { Booktour } from 'src/app/app-management/Model/Booktour';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-list-tour-user',
  templateUrl: './list-tour-user.component.html'
})
export class ListTourUserComponent implements OnInit {

  constructor(private route: ActivatedRoute,public layoutService: LayoutService, public router: Router,private messageService: MessageService, private http: HttpClient, private  authService: AuthService) {
  
  }
  header: any;
  
  tourTripInfor: any;
  listBookTour: Tour[] = [];
  listTrip: any[] = [];
  showDetailTour: boolean = false;
  ngOnInit() {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadData();
  }
  loadData() {
    this.http.get<ResponseMessage>("/api/v1/project/booktour/findByUsername?username="+this.authService.getUsername(),{headers:this.header}).subscribe(
      data => {
          if(data.resultCode == 0 ) {
              this.listBookTour = data.data;
              // console.log(this.listBookTour)
          }
          else {
              this.messageService.add({severity:'error', summary:data.message});
          }
      },
      error => {
          this.messageService.add({severity:'error', summary:'Error occur'});
      }
  );
  this.http.get<ResponseMessage>("/api/v1/project/trip/findByAccount?username="+this.authService.getUsername(),{headers:this.header}).subscribe(
    data => {
        if(data.resultCode == 0 ) {
            this.listTrip = data.data;
            // console.log(this.listTrip)
        }
        else {
            this.messageService.add({severity:'error', summary:data.message});
        }
    },
    error => {
        this.messageService.add({severity:'error', summary:'Error occur'});
    }
)

  }

  detail(object:any) {
    this.showDetailTour = true;
    // console.log(object.tourTripCode)
    let code = object.tourTripCode;
    if(code == undefined) 
      code = object.code;
    this.http.get<ResponseMessage>("/api/v1/project/auth/trip/findTourTripInfor?code="+code).subscribe(
      data => {
          if(data.resultCode == 0 ) {
              this.tourTripInfor = data.data;
              // console.log(this.tourTripInfor)
          }
          else {
              this.messageService.add({severity:'error', summary:data.message});
          }
      },
      error => {
          this.messageService.add({severity:'error', summary:'Error occur'});
      }
  )

  }

}

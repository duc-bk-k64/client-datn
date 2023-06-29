import { async } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Booktour } from 'src/app/app-management/Model/Booktour';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { storageKey } from 'src/app/app-constant';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html'
})
export class BookTourComponent implements OnInit {

  constructor(private route: ActivatedRoute,public layoutService: LayoutService, public router: Router,private messageService: MessageService, private http: HttpClient, private  authService: AuthService) {
  
  }
  tourId: number = -1;
  tripCode: string = '';
  tour: Tour = {};
  trip: any;
  username: string = '';
  booktour: Booktour  = {
    numberOfAdjust:0,
    numberOfChildren:0,
    moneyToPay:0
  };
  totalMoney:number = 0;
  header: any;
  loading: boolean = false;

  ngOnInit(){
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.tourId = this.route.snapshot.params['tourId'];
    this.tripCode = this.route.snapshot.params['tripCode'];
    this.username = this.authService.getUsername();
    this.loadData();
    this.booktour.tourTripCode = this.tripCode;
  }
  loadData() {
    this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/tour/findTourId?tourId="+this.tourId).subscribe(
      data => {
          if(data.resultCode == 0 ) {
              this.tour = data.data;
              console.log(this.tour)
          }
          else {
              this.messageService.add({severity:'error', summary:data.message});
          }
      },
      error => {
          this.messageService.add({severity:'error', summary:'Error occur'});
      }
  )
  this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/trip/findTripByTripCode?code="+this.tripCode).subscribe(
    data => {
        if(data.resultCode == 0 ) {
            this.trip = data.data;
            console.log(this.trip)
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
  caculatePrice() {
    this.booktour.moneyToPay = this.booktour.numberOfAdjust*this.trip.price +this.booktour.numberOfChildren*this.trip.priceForChidren;
    // console.log(this.booktour)
  }
  async bookTourFunc() {
    // console.log(this.booktour)
    this.loading = true
    await this.http.post<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/booktour/create?username="+this.username,this.booktour,{headers: this.header}).toPromise().then(
      data => {
        if(data?.resultCode == 0) {
          this.messageService.add({severity:'success', summary:'Đặt tour thành công'});
          if(this.authService.getRole()  == "ROLE_USER") {
            setTimeout(()=>{this.router.navigate(['/pages/home-user']);},2000)
      
          } else {
            setTimeout(()=>{this.router.navigate(['/landing']);},2000)
          }
        }
        else {
          this.messageService.add({severity:'error', summary:"Vui lòng điền đầy đủ thông tin"});

        }

      },
      error => {
        this.messageService.add({severity:'error', summary:'Error occur'});
      }
    )
    this.loading = false;

  }


}

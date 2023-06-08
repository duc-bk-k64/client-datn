import { LayoutService } from './../../../../layout/service/app.layout.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { storageKey, DEPARTURE, PRICE, TIME } from 'src/app/app-constant';
import { ResponseMessage } from 'src/app/app-management/Model/ResponseMessage';
import { Tour } from 'src/app/app-management/Model/Tour';
import { AuthService } from 'src/app/app-management/service/auth.service';

@Component({
  selector: 'app-detail-tour',
  templateUrl: './detail-tour.component.html',
  styles: [`
  #hero{
      background: linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%);
      height:700px;
      overflow:hidden;
  }

  .pricing-card:hover{
      border:2px solid var(--cyan-200) !important;
  }

  @media screen and (min-width: 768px) {
      #hero{
          -webkit-clip-path: ellipse(150% 87% at 93% 13%);
          clip-path: ellipse(150% 87% at 93% 13%);
          height: 530px;
      }
  }

  @media screen and (min-width: 1300px){
      #hero > img {
          position: absolute;
          transform:scale(1.2);
          top:15%;
      }

  #hero > div > p {
          max-width: 450px;
      }
  }

  @media screen and (max-width: 1300px){
      #hero {
          height: 600px;
      }

  #hero > img {
      position:static;
      transform: scale(1);
      margin-left: auto;
  }

  #hero > div {
      width: 100%;
  }

  #hero > div > p {
          width: 100%;
          max-width: 100%;
      }
  }
`]
})
export class DetailTourComponent implements OnInit {
  @ViewChild('dt1') dt1: Table | undefined;
  
// 

  tourId: number = -1;
  tourCode: string ='';
  tour: Tour = {};
  loading: boolean = false;
  listDestination: any[] = [];
  listPitstop: any[] = [];
  listTourDestination: any[] = [];
  listTrip: any[] = [];
  listFeedback: any[] = [];

  constructor(private route: ActivatedRoute,public layoutService: LayoutService, public router: Router,private messageService: MessageService, private http: HttpClient, private  authService: AuthService) {
  
   }
  ngOnInit() {
      this.tourId = this.route.snapshot.params['id'];
      this.tourCode = this.route.snapshot.params['code'];
      this.loadTour();
      this.loadData()
     
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
   login() {
      this.router.navigate(['/auth/login']);
  }
  register() {
      this.router.navigate(['/auth/signup']);
  }
  loadTour() {
      this.http.get<ResponseMessage>("/api/v1/project/auth/tour/findTourId?tourId="+this.tourId).subscribe(
          data => {
              if(data.resultCode == 0 ) {
                  this.tour = data.data;
                  // console.log(this.tour)
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
  loadData() {
    this.http.get<ResponseMessage>("/api/v1/project/auth/des/findAll").subscribe(
        data => {
            if(data.resultCode == 0 ) {
                this.listDestination = data.data;
                // console.log(this.listDestination)
            }
            else {
                this.messageService.add({severity:'error', summary:data.message});
            }
        },
        error => {
            this.messageService.add({severity:'error', summary:'Error occur'});
        }
    )
    this.http.get<ResponseMessage>("/api/v1/project/auth/pitstop/findByTourId?tourId="+this.tourId).subscribe(
      data => {
          if(data.resultCode == 0) {
              this.listPitstop = data.data;
              // console.log(this.listPitstop);
          }  else {
              this.messageService.add({severity:'error', summary:data.message});
          }
      },
      error => {
          this.messageService.add({severity:'error', summary:'Error occur'});
      }
  )
  this.http.get<ResponseMessage>("/api/v1/project/auth/des/findByTourId?tourId="+this.tourId).subscribe(
      data => {
          if(data.resultCode == 0 ) {
              this.listTourDestination = data.data;
              // console.log(this.listTourDestination)
          }
          else {
              this.messageService.add({severity:'error', summary:data.message});
          }
      },
      error => {
          this.messageService.add({severity:'error', summary:'Error occur'});
      }
  )
  this.http.get<ResponseMessage>("/api/v1/project/auth/trip/findByTourId?tourId="+this.tourId).subscribe(
    data => {
        if(data.resultCode == 0 ) {
            this.listTrip = data.data;
            console.log(this.listTrip)
        }
        else {
            this.messageService.add({severity:'error', summary:data.message});
        }
    },
    error => {
        this.messageService.add({severity:'error', summary:'Error occur'});
    }
)
this.http.get<ResponseMessage>("/api/v1/project/auth/feedback/findByTourId?tourId="+this.tourId).subscribe(
    data => {
        if(data.resultCode == 0 ) {
            this.listFeedback = data.data;
            console.log(this.listFeedback)
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
bookTour(object: any) {
    this.router.navigate(["/bookTour/"+this.tour.id+"/"+object.code]);
}

 
}

import { async } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../../service/auth.service';
import { DEPARTURE, PRICE, TIME, storageKey } from 'src/app/app-constant';
import { ResponseMessage } from '../../Model/ResponseMessage';
import { Tour } from '../../Model/Tour';
import { FindTourModel } from '../../Model/FindtourModel';
import { environment } from 'src/environments/environment.prod';


@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
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
export class LandingComponent implements OnInit {
    header:any;
    listTour: Tour[] = [];
    listResultTour: Tour[] = [];
    isFindTour: boolean = false;
    loading: boolean = false;
    departure: string = '';
    destination: number = -1;
    time: string ='';
    price: string ='';
    listDeparture: any[] = [];
    listDestination: any[] = [];
    listPrice: any[] = [];
    listTime: any[] = [];
    showDetailTour: boolean = false;
    selectedTour:  Tour ={};
    listPitstop: any[] = [];
    listTourDestination: any[] = [];
    findtour: FindTourModel = {
        departure:'hanoi',
        destination:2,
        time:'0-5',
        price:'0-3000000'
    };


    constructor(public layoutService: LayoutService, public router: Router,private messageService: MessageService, private http: HttpClient, private  authService: AuthService) {
    
     }
    ngOnInit() {
        this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
        this.loadTour();
        this.findDestination();
        this.listDeparture =  DEPARTURE;
        this.listPrice = PRICE;
        this.listTime = TIME;
    }
     login() {
        this.router.navigate(['/auth/login']);
    }
    register() {
        this.router.navigate(['/auth/signup']);
    }
    async loadTour() {
        await this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/tour/findAlls",{headers:this.header}).toPromise().then(
            data => {
                if(data?.resultCode == 0 ) {
                    this.listTour = data.data;
                    // console.log(this.listTour)
                }
                else {
                    this.messageService.add({severity:'error', summary:data?.message});
                }
                console.log(data)
            },
            error => {
                console.log("Error")
                console.log(error)
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )
    }

    async findTour() {
        this.loading = true;
        this.findtour.departure = this.departure;
        this.findtour.destination = this.destination;
        this.findtour.price = this.price;
        this.findtour.time = this.time;
        await this.http.post<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/tour/findTour",this.findtour).toPromise().then(
            data => {
                if(data?.resultCode == 0 ) {
                    this.listResultTour = data.data;
                    this.isFindTour = true;
                    console.log(this.listResultTour)
                }
                else {
                    this.messageService.add({severity:'error', summary:data?.message});
                }
            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )
        // console.log(this.findtour);
        this.loading = false;
    }
    findDestination() {
        this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/des/findAll").subscribe(
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

    }
    detailTour(object: any) {
        this.router.navigate(['landing/detailTour/'+object.id+'/'+object.code]);
    }
    showDialogDetailTour(object: any) {
        this.showDetailTour = true;
        this.selectedTour = object;
        this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/pitstop/findByTourId?tourId="+this.selectedTour.id).subscribe(
            data => {
                if(data.resultCode == 0) {
                    this.listPitstop = data.data;
                    console.log(this.listPitstop);
                }  else {
                    this.messageService.add({severity:'error', summary:data.message});
                }
            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )
        this.http.get<ResponseMessage>(environment.backendApiUrl+"/api/v1/project/auth/des/findByTourId?tourId="+this.selectedTour.id).subscribe(
            data => {
                if(data.resultCode == 0 ) {
                    this.listTourDestination = data.data;
                    console.log(this.listTourDestination)
                }
                else {
                    this.messageService.add({severity:'error', summary:data.message});
                }
            },
            error => {
                this.messageService.add({severity:'error', summary:'Error occur'});
            }
        )

        // console.log(this.selectedTour);
    }

    post(object: any) {
        this.router.navigate(['/landing/post/'+object.id]);
        localStorage.setItem("desName",object.name);
    }
}

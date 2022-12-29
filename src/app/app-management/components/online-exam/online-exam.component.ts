import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-online-exam',
  templateUrl: './online-exam.component.html'
})
export class OnlineExamComponent implements OnInit {

  constructor(private route:ActivatedRoute,public http: HttpClient,public router: Router) {
    this.route.paramMap.subscribe((params)=> {
      this.id=params.get('id');

     })
   }
  id: any;
  questions : any[] = []

  ngOnInit(): void {
   this.questions = [
  'Cau 1','Cau 2','Cau 3','Cau 4', 'Cau 5','Cau 6','Cau 7', 
   ]
    var x = setInterval(()=>{
      --this.counter;
      if(this.counter < 0) {
        clearInterval(x)
        this.min="EXPIRED";
        this.second=null;
      }
      else {
        this.min = Math.floor(this.counter/60);
        this.second =this.counter%60;
      }


    },1000)
   

    
  }
  countDown:any;
  counter = 18;
  tick = 1000;
  min :any;
  second : any;


}

import { Question } from './../../Model/Question';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  selected: any;
  questions : Question[] = [];
  listAnswer: any[] = [];
  examName : String = "BÀI THI ĐẠI SỐ TUYẾN TÍNH";
  expired: boolean = false;

  ngOnInit(): void {
   this.questions = [
    {
    id:4,
    content:'Giới hạn trên của hàm số là gì',
    images:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvi19iv08GvZ-kiirx1V9hQ1x3eN3LH5TJyg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiViWt7Wv46JPL06iLDj-YAlxp0hnjgi6E-Q&usqp=CAU'],
    type:'SINGLE_SELECT',
    numberOfAnswer:4,
    numberOfCorrectAnswer:1,
    level:'EASY',
    status:true,
    note:'',
    subject:null,
    listAnswer:[' A',' B',' C',' D']
    } ,
    {
      id:4,
      content:'Gioi han tren la gi',
      images:[],
      type:'MULTI_SELECT',
      numberOfAnswer:4,
      numberOfCorrectAnswer:2,
      level:'MEDIUM',
      status:true,
      note:'',
      subject:null,
      listAnswer:[' A',' B',' C',' D']
      },
      {
        id:4,
        content:'Gioi han tren la gi',
        images:[],
        type:'FILL_IN_BLANK',
        numberOfAnswer:4,
        numberOfCorrectAnswer:1,
        level:'EASY',
        status:true,
        note:'',
        subject:null,
        listAnswer:[]
        } ,
        {
          id:4,
          content:'Giới hạn trên của hàm số là gì',
          images:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvi19iv08GvZ-kiirx1V9hQ1x3eN3LH5TJyg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiViWt7Wv46JPL06iLDj-YAlxp0hnjgi6E-Q&usqp=CAU'],
          type:'SINGLE_SELECT',
          numberOfAnswer:4,
          numberOfCorrectAnswer:1,
          level:'EASY',
          status:true,
          note:'',
          subject:null,
          listAnswer:[' A',' B',' C',' D']
          } ,
          {
            id:4,
            content:'Gioi han tren la gi',
            images:[],
            type:'MULTI_SELECT',
            numberOfAnswer:4,
            numberOfCorrectAnswer:2,
            level:'EASY',
            status:true,
            note:'',
            subject:null,
            listAnswer:[' A',' B',' C',' D']
            },
            {
              id:4,
              content:'Gioi han tren la gi',
              images:[],
              type:'FILL_IN_BLANK',
              numberOfAnswer:4,
              numberOfCorrectAnswer:1,
              level:'EASY',
              status:true,
              note:'',
              subject:null,
              listAnswer:[]
              },
              {
                id:4,
                content:'Giới hạn trên của hàm số là gì',
                images:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvi19iv08GvZ-kiirx1V9hQ1x3eN3LH5TJyg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiViWt7Wv46JPL06iLDj-YAlxp0hnjgi6E-Q&usqp=CAU'],
                type:'SINGLE_SELECT',
                numberOfAnswer:4,
                numberOfCorrectAnswer:1,
                level:'EASY',
                status:true,
                note:'',
                subject:null,
                listAnswer:[' A',' B',' C',' D']
                } ,
                {
                  id:4,
                  content:'Gioi han tren la gi',
                  images:[],
                  type:'MULTI_SELECT',
                  numberOfAnswer:4,
                  numberOfCorrectAnswer:2,
                  level:'EASY',
                  status:true,
                  note:'',
                  subject:null,
                  listAnswer:[' A',' B',' C',' D']
                  },
                  {
                    id:4,
                    content:'Gioi han tren la gi',
                    images:[],
                    type:'FILL_IN_BLANK',
                    numberOfAnswer:4,
                    numberOfCorrectAnswer:1,
                    level:'EASY',
                    status:true,
                    note:'',
                    subject:null,
                    listAnswer:[]
                    } 
   ]
    var x = setInterval(()=>{
      --this.counter;
      if(this.counter < 0) {
        clearInterval(x)
        this.min="EXPIRED";
        this.second=null;
        this.expired = true;
      }
      else {
        this.min = Math.floor(this.counter/60);
        this.second =this.counter%60;
      }


    },1000)
   

    
  }
  countDown:any;
  counter = 100;
  tick = 1000;
  min :any;
  second : any;
  submit() {
    for(let i=0; i<this.questions.length;i++) {
      console.log('question '+i+' :'+this.listAnswer[i])
    }
    this.counter=0;
  }
}

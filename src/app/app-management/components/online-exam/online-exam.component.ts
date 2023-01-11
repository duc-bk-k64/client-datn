import { Answer } from './../../Model/Answer';
import {  storageKey } from './../../../app-constant';
import { Question } from './../../Model/Question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { MessageService } from 'primeng/api';
import { Exam } from '../../Model/Exam';

@Component({
  selector: 'app-online-exam',
  templateUrl: './online-exam.component.html'
})
export class OnlineExamComponent implements OnInit {

  constructor(private route:ActivatedRoute,public http: HttpClient,public router: Router, private authService: AuthService,private messageService: MessageService) {
    this.route.paramMap.subscribe((params)=> {
      this.id=params.get('id');

     })
   }
  id: any;
  selected: any;
  questions : Question[] = [];
  answers : any[] = [];
  listAnswer: any[] = [];
  examName : String = "BÀI THI ĐẠI SỐ TUYẾN TÍNH";
  expired: boolean = false;
  answerDTO : Answer = {};
  exam: Exam[] = []
  typeQuestion = ['SINGLE_SELECT','MULTI_SELECT','FILL_IN_BLANK']
  ngOnInit(): void {
    this.header = new HttpHeaders().set(storageKey.AUTHORIZATION,this.authService.getToken());
    this.loadQuestion();
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
  counter = 1800;
  tick = 1000;
  min :any;
  second : any;
  header:any;
  async submit() {
    for(let i=0; i<this.questions.length;i++) {
      if(this.listAnswer[i]==undefined) this.listAnswer[i] = '';
      console.log("question ID "+this.questions[i].id+" : "+this.listAnswer[i])
    }
    this.messageService.add({severity:'success', summary:'Nộp bài thành công'});
    
    this.counter=0;
  }
  async loadQuestion() {
    await this.http.get<any>("/api/student-answers/exam?studentId=4&examClassId=74",{headers: this.header}).toPromise().then(
      data => {
        this.exam = data;
      },
      error => {
        console.log(error)
      }
    );
   
    for(let i = 0; i<this.exam.length;i++) {
      this.questions.push(this.exam[i].question||{});
      this.answers.push(this.exam[i].answerDTOS);
    }
    // missing value
    for(let i = 0;i<this.questions.length;i++) {
      this.questions[i].answerDTOs = this.answers[i];
      this.questions[i].type =this.typeQuestion[Math.floor(Math.random()*3)]
      this.questions[i].content = "Câu hỏi là gì?";
      this.questions[i].level = "EASY";
    }

  }
}

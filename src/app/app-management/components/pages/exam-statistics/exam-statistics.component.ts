import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exam-statistics',
  templateUrl: './exam-statistics.component.html'
})
export class ExamStatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  examList: any[] = [];
  subjectList: any[] = [];
  subjectSelected : any;
  examSelected: any;

}

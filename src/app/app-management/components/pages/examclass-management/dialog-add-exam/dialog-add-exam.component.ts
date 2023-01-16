import { Component, ElementRef, Inject, OnInit, ViewChild, } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl, Form, } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from "@angular/material/dialog";
import { BaseClass } from 'src/app/BaseClass';
import { MessageService } from "primeng/api";
// import { BaseClass } from 'src/app/base-class';
import { ExamClassService } from 'src/app/app-management/service/examclass.service';
@Component({
  selector: 'app-dialog-add-exam',
  templateUrl: './dialog-add-exam.component.html',
  styleUrls: ['./dialog-add-exam.component.scss']
})
export class DialogAddExamComponent extends BaseClass implements OnInit {
  formControl: FormGroup= this.formBuilder.group({
    name: ["", [Validators.required]],
    numberOfStudents: ["", [Validators.required]],
    numberOfQuestions: ["", [Validators.required]],
    startTime: ["", [Validators.required]],
    endTime: ["",[Validators.required]],
    easyQuestionRate: ["",[Validators.required]],
    mediumQuestionRate: ["",[Validators.required]],
    difficultQuestionRate: ["",[Validators.required]],
    subjectId: ["",[Validators.required]],
    teacherId:  ["",[Validators.required]],
     isComeBack: ["true"],
    status: [""],
    note: [""],
    
});;
  constructor(private service:ExamClassService,
    private formBuilder: FormBuilder,
              private dialog:MatDialog,
              public dialogRef:MatDialogRef<DialogAddExamComponent>,
              private messageService: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: any
              ) { 
    super()
  }

  ngOnInit(): void {
    
  }
addExam(){
  this.service.addExam(this.data.item).pipe(this.unsubsribeOnDestroy)
  .subscribe(
      (rs: any) => {
          if (rs.success) {
             
              this.dialogRef.close(true);
          } else{
            this.messageService.add({severity:'error', summary: 'Error', detail: 'Có lỗi xảy ra'})
          }
              
      },
      (error) => {this.messageService.add({severity:'error', summary: 'Error', detail: 'Có lỗi xảy ra'});}
  )
}
}

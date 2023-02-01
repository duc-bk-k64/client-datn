import { Answer } from "./Answer";
import { Question } from "./Question";

export interface Exam {
    id?:number;
    content?:string;
    questionImages?:string;
    question_id?:number;
    questionContent?:string;
    questionType?:string;
    answerId?:number;
    answerContent?:string;
    answerImages?:string;
    is_correct?:boolean;
    images?:string;
}
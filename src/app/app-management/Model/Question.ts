import { Answer } from './Answer';
export interface Question {
    id?:number;
    content?:string;
    images?:string;
    type?:string;
    answerDTOs?:Answer[];
    question_id?:number;
}
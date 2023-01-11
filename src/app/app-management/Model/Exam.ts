import { Answer } from "./Answer";
import { Question } from "./Question";

export interface Exam {
    id?:number;
    question?:Question;
    answerDTOS?:Answer[];
}
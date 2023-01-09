export interface Question {
    id?:number;
    content?:string;
    images?:string[];
    type?:string;
    numberOfAnswer?:number;
    numberOfCorrectAnswer?:number;
    level?:string;
    status?:boolean;
    note?:string;
    subject?:any;
    listAnswer?:string[];
}
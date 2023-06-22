import { PitstopStatus } from "./PitstopStatus";

export interface Pitstop {
    id?:number;
    name?:string;
    content?:string;
    imageUrl?:string;
    order?:number;
    status?:string;
    note?:string;
    tripPitstopId?:number;
}
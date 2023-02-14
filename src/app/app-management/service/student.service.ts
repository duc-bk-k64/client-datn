import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { BaseService } from './base/base.service';
import { getServerApiUrl, storageKey } from 'src/app/app-constant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseService{
    private sharedHeaders = new HttpHeaders();
    constructor(private _http: HttpClient,private authService: AuthService) {
        super();
        this.sharedHeaders = this.sharedHeaders.set(storageKey.AUTHORIZATION,this.authService.getToken());
    }
    getListSV(item:any){
        return this._http
        .get<any>(`/api/exam-class-students/students/${item}`, {
            headers: this.sharedHeaders,
        }) 
    }
    getAllSV(){
        return this._http
        .get<any>(`/api/students`, {
            headers: this.sharedHeaders,
        }) 
    }
}
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';
//import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';
//import 'rxjs/add/observable/throw';
//import 'rxjs';
//import {map, catch, throw } from 'rxjs/Rx';
import { Overallqc } from './overallqc';
//import { map  } from 'rxjs/Rx';//, throw as rxThrow, catch as rxCatch
//import { map } from 'rxjs/operators';
//import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OverallService {
  //private baseUrl:string='http://localhost:7861';
  private baseUrl:string= 'http://localhost:7861';
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor(private _http:Http) { }
  private overallqc = new Overallqc(); 
  getOverallQC(id:Number){

    return this._http.get(this.baseUrl+'/noteo/'+id,this.options).pipe(map((response:Response)=>response.json()));
      // .catch(this.errorHandler);
   }
  updateOverallQC(overallqc:Overallqc){

    return this._http.put(this.baseUrl+'/noteo',JSON.stringify(overallqc),this.options).pipe(map((response:Response)=>response.json()));
      // .catch(this.errorHandler);
   }

   createOverallQC(overallqc:Overallqc){

    return this._http.post(this.baseUrl+'/noteo',JSON.stringify(overallqc),this.options).pipe(map((response:Response)=>response.json()));
     //  .catch(this.errorHandler);
   }


  setter(overallqc:Overallqc){
    this.overallqc =overallqc;
 }
 
 getter(){
    return this.overallqc;
 }

 errorHandler(error:Response){
  return Observable.throw(error || "SERVER ERROR");
}
}

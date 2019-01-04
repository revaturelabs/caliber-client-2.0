import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { Overallqc } from '../../overallqc';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OverallService {

  private baseUrl:string= 'http://localhost:9075/audit/';
  private headers = new Headers({'Content-Type':'application/json'});
  private options = new RequestOptions({headers:this.headers});
  constructor(private _http:Http) { }
  private overallqc = new Overallqc(); 
  getOverallQC(week: Number, batchid: Number){

    return this._http.get(this.baseUrl+'notes/'+batchid +'/'+week,this.options).pipe(map((response:Response)=>response.json()));
      // .catch(this.errorHandler);
   }
  updateOverallQC(overallqc:Overallqc) {

    return this._http.put(this.baseUrl+'update',JSON.stringify(overallqc),this.options).pipe(map((response:Response)=>response.json()));
      // .catch(this.errorHandler);
   }

   createOverallQC(overallqc:Overallqc){

    return this._http.post(this.baseUrl+'create',JSON.stringify(overallqc),this.options).pipe(map((response:Response)=>response.json()));
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

/**
 * getCurrentNotes(week: Number, batchid: Number): Observable<Note> {
  return this.http.get<Note>(this.noteUrl + 'notes/' + batchid + '/' + week);
}

updateNote(note: Note): Observable<Note> {
  return this.http.put<Note>(this.noteUrl + 'update', note);
}
 */

   //endpoint: localhost:9075/audit/notes/overall/{batchId}/{week}
  /** response:
{
    "noteId": 65,
    "content": " ",
    "week": 3,
    "batchId": 1,
    "trainee": null,
    "traineeId": 0,
    "type": "QC_BATCH",
    "qcStatus": "Undefined",
    "updateTime": 1546528285639,
    "updateTrainer": null
}*/
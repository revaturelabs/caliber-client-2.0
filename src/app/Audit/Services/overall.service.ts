import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map, filter, switchMap } from 'rxjs/operators';
import { Overallqc } from '../../overallqc';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Note } from '../types/Note';
import { BatchService } from 'src/app/Batch/batch.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OverallService {

  private awsUrl: string = 'http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/qa';
  private baseUrl: string = 'http://localhost:9075/';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private _http: Http, private http: HttpClient, public serviceBatch: BatchService) { }

  private overallqc = new Overallqc();
  batchId = this.serviceBatch.selectedBatch;
  weekId = this.serviceBatch.selectedWeek;
  public note: Note;

  getOverallQC(id: Number) {
    return this._http.put(this.awsUrl + '/note/update',
    JSON.stringify(this.overallqc), this.options).pipe(map((response: Response) => response.json()));
    // .catch(this.errorHandler);
  }

  updateOverallStatus(note: Note): Observable<Note> {
    console.log(note);
    console.log(this.awsUrl, '/audit/update');
    return this.http.put<Note>('http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/qa/audit/update', note);
  }


  getOverallSmileyStatus(weekId: Number, batchId: Number): Observable<Note> {
    return this.http.get<Note>(this.awsUrl + '/audit/notes/overall/' + weekId +  '/' + batchId);
    //return this.http.get<Note>(this.baseUrl + 'audit/notes/overall/1/4');
  }

  createOverallQC(overallqc: Overallqc) {

    return this._http.post(this.awsUrl + '/create/', JSON.stringify(overallqc),
      this.options).pipe(map((response: Response) => response.json()));
    //  .catch(this.errorHandler);
  }

  setter(overallqc: Overallqc) {
    this.overallqc = overallqc;
  }

  getter() {
    return this.overallqc;
  }

  errorHandler(error: Response) {
    return Observable.throw(error || "SERVER ERROR");
  }
}

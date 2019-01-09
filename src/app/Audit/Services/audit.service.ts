import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Note } from '../types/Note';
import { Trainee } from '../types/Trainee';

/**
 * sets headers for recieving JSON objects
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  //local
  //url = 'http://localhost:9095';
  url = 'http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/user';

  //noteUrl = 'http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/zuul/audit/audit/';
  noteUrl = 'http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/qa/audit';
  //traineeUrl = 'http://localhost:9075/trainee/update/';
  traineeUrl = 'http://caliber-v2-alb-1098400863.eu-west-2.elb.amazonaws.com/qa/trainee/update/';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  batchUpdateURL = '/all/batch/update';
  yearsURL = '/all/batch/valid_years';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;

  processingNote = false;
  noteUpdate = false;

  constructor(private http: HttpClient) { }

  /**
  * get all batches by specified year from batch microservice
  * @param year year that all batches should be retrieved from
  *
  */
  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  /**
 * get all starting years from batch microservice
 */
  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

  /**
 * updates specified batch in batch microservice
 * @param batch batch to be updated
 */
  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + this.batchUpdateURL, batch, httpOptions);
  }

  getCurrentNotes(week: Number, batchid: Number): Observable<Note> {
    return this.http.get<Note>(this.noteUrl + '/notes/' + batchid + '/' + week);
  }

  updateNote(note: Note): Observable<Note> {
    console.log(note);
    console.log(this.noteUrl + '/update');
    return this.http.put<Note>(this.noteUrl + '/update', note);
  }

  updateTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(this.traineeUrl, trainee);
  }
}
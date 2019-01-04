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

  url = 'http://localhost:9095';
  noteUrl = 'http://localhost:9075/audit/';
  traineeUrl = 'http://localhost:9075/trainee/update/';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  batchUpdateURL = '/all/batch/update';
  yearsURL = '/all/batch/valid_years';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;
  ProcessingNote = false;

  constructor(private http: HttpClient) { }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
  }

    /**
   * updates specified batch in batch service
   * @param batch batch to be updated
   */
  putBatch(batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(this.url + this.batchUpdateURL, batch, httpOptions);
  }

  getCurrentNotes(week: Number, batchid: Number): Observable<Note> {
    return this.http.get<Note>(this.noteUrl + 'notes/' + batchid + '/' + week);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.noteUrl + 'update', note);
  }

  updateTrainee(trainee: Trainee): Observable<Trainee> {
    return this.http.put<Trainee>(this.traineeUrl, trainee);
  }
}

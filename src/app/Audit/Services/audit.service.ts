import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  batchUpdateURL = '/all/batch/update';
  yearsURL = '/all/batch/valid_years';
  selectedYear: number;
  selectedBatch: Batch;
  selectedWeek = 1;

  constructor(private http: HttpClient) { }

  //getBatchesByYear returns from the database, all the batches 
  //given by the particular year as an observable
  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  //getAllYears returns all the available years with batches from the database as an observable
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

  
}

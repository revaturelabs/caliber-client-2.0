import { Injectable } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';
import { Observable, Subject } from 'rxjs';
<<<<<<< HEAD
import {Http, Response, Headers, RequestOptions} from '@angular/http';
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> overall

@Injectable({
  providedIn: 'root'
})
export class AuditService {

<<<<<<< HEAD
  url = 'http://localhost:9090';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
=======
  url = 'http://caliber-v2-1680103809.eu-west-2.elb.amazonaws.com/batch';
  batchAllURL = '/vp/batch/all';
  batchesYearURL = '/vp/batch/';
  yearsURL = '/all/batch/valid_years'
>>>>>>> overall

  batches: Batch[] = [
    { batchId: 1,
      trainingName: null,
      trainingType: null,
      skillType: null,
      trainer: "Genesis Bonds",
      coTrainer: null,
      location: "Reston",
      locationId: 1,
      startDate: new Date('11/18/18'),
      endDate: new Date('1/7/19'),
      goodGrade: 3,
      passingGrade: 1,
      traineeCount: 10 },
    { batchId: 2,
      trainingName: null,
      trainingType: null,
      skillType: null,
      trainer: "Quintin Donnelly",
      coTrainer: null,
      location: "Tampa",
      locationId: 2,
<<<<<<< HEAD
      startDate: new Date('12/18/18'),
=======
      startDate: new Date('12/17/18'),
>>>>>>> overall
      endDate: new Date('3/19/19'),
      goodGrade: 3,
      passingGrade: 1,
      traineeCount: 10 }
  ];

<<<<<<< HEAD
  years: number[] = [2017,2018,2019,2020];

  constructor() { }

  getBatchesByYear(year: number) /*Observable*/ {
    //return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
    return this.batches;
  }

  getAllYears() /*Observable*/ {
    //return this.http.get<number[]>(this.url + this.batchAllYearsURL);
    return this.years;
=======
  years: number[] = [2020,2019,2018,2017];

  constructor(private http: HttpClient) { }

  getBatchesByYear(year: number): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.url + this.batchesYearURL + year);
  }

  getAllYears(): Observable<number[]> {
    return this.http.get<number[]>(this.url + this.yearsURL);
>>>>>>> overall
  }

}

import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import {BatchService} from 'src/app/Batch/batch.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  years: number[];
  batches: Batch[];
  selectedBatches: Batch[];
  defaultYears: number[];
  selectedYear: number;
  selectedBatch: Batch;
  selectedBatchId = 0;
  weeks = [];
  selectedWeek: number;

  constructor(
    public BatchService: BatchService
  ) { }

  ngOnInit() {
    
    this.selectedWeek=1;
    this.getAllYears();

  }

  getAllYears() {
    this.BatchService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0];
      console.log(this.years);
      this.getBatches();
    });
    
  }

  getBatches() {
    this.BatchService.getBatchesByYear(this.selectedYear)
    .subscribe(result => {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      this.BatchService.selectedBatch = this.batches[0];
      console.log(this.batches);
      this.getWeeks();
      });
      
  }

  selectYear(event: number) {
    this.selectedYear = event;
    this.BatchService.selectedYear = this.selectedYear;
    this.BatchService.getBatchesByYear(event)
    .subscribe(result => {
      this.batches = result;
      });
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.BatchService.selectedBatch = this.selectedBatch;
    this.getWeeks();
  }

  showActiveWeek(week: number) {
    if (week==this.selectedWeek) {
      return "active";
    }
  }

  selectWeek(event: number) {
    this.selectedWeek = event;
    this.BatchService.selectedWeek = event;
  }

  addWeek() {
    var last = this.weeks[this.weeks.length-1];
    this.weeks.push(last+1);
    this.selectedWeek=last+1;
    this.selectedBatch.weeks++;
    console.log(this.selectedBatch.batchId);
    this.BatchService.putBatch(this.selectedBatch).subscribe(result => {
      console.log('updated');
    });
  }

  getWeeks() {
    this.weeks = [];
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);
    }
  }

}
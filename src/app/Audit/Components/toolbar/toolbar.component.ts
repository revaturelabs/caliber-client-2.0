import { Component, OnInit } from '@angular/core';
import { AuditService } from 'src/app/Audit/Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';

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
  weeks = [1,2,3,4,5,6];
  selectedWeek: number;

  constructor(
    public auditService: AuditService
  ) { }

  ngOnInit() {
    
    this.selectedWeek=6;
    this.getAllYears();

  }

  getAllYears() {
    this.auditService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0];
      console.log(this.years);
      this.getBatches();
    });
    
  }

  getBatches() {
    this.auditService.getBatchesByYear(this.selectedYear)
    .subscribe(result => {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      console.log(this.batches);
      this.getWeeks();
      });
      
  }

  selectYear(event: number) {
    this.selectedYear = event;
    this.auditService.getBatchesByYear(event)
    .subscribe(result => {
      this.batches = result;
      });
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
  }

  showActiveWeek(week: number) {
    if (week==this.selectedWeek) {
      return "active";
    }
  }

  selectWeek(event: number) {
    this.selectedWeek = event;
  }

  addWeek() {
    var last = this.weeks[this.weeks.length-1];
    this.weeks.push(last+1);
    this.selectedWeek=last+1;
  }

  getWeeks() {
    console.log(this.batches[0].weeks);
  }

}

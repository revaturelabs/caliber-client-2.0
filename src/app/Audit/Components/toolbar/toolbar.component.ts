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
    this.selectedYear=2018;
    this.selectedBatch={ batchId: 1,
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
      traineeCount: 10 };
    this.selectedWeek=6;
    this.getAllYears();
    this.getBatches();
  }

  getAllYears() {
    this.years=this.auditService.getAllYears();
  }

  getBatches() {
    this.batches = this.auditService.getBatchesByYear(this.selectedYear);
  }

  selectYear(event: number) {
    this.selectedYear = event;
    this.batches = this.auditService.getBatchesByYear(event);
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

}

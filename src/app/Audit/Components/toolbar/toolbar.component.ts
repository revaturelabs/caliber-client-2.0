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
      startDate: new Date(),
      endDate: new Date(),
      goodGrade: 3,
      passingGrade: 1,
      traineeCount: 10 };
    this.getAllYears();
    this.getBatches();
  }

  getAllYears() {
    this.years=this.auditService.getAllYears();
  }

  getBatches() {
    this.batches = this.auditService.getBatchesByYear(2018);
  }

  selectYear(event: number) {
    this.selectedYear = event;
    this.batches = this.auditService.getBatchesByYear(event);
  }

  selectBatch(event: Batch) {
    this.selectedBatch = event;
    
  }

}

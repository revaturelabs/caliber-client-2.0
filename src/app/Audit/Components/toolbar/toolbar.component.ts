import { Component, OnInit } from '@angular/core';
import { BatchService } from 'src/app/Batch/batch.service';
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
  weeks = [];
  selectedWeek: number;

  constructor(
    //injecting audit service
    public batchService: BatchService
  ) { }

  ngOnInit() {
    
    this.getAllYears();

  }

  //getAllYears returns every applicable year from the database
  //selects the latest year as the default year
  //calls the getBatches() function
  getAllYears() {
    this.batchService.getAllYears()
    .subscribe(result => {
      this.years = result;
      this.selectedYear = this.years[0];
      this.getBatches();
    });
    
  }

  //getBatches returns all the batches depending on the selected year
  //selects the default batch, and then calls the getWeeks() function
  getBatches() {
    this.batchService.getBatchesByYear(this.selectedYear)
    .subscribe(result => {
      this.batches = result;
      this.selectedBatch = this.batches[0];
      this.batchService.selectedBatch = this.batches[0];
      this.getWeeks();
    });
      
  }

  //getWeeks function updates the local weeks array to include an array of all the
  //available weeks for the selected batch. It also changes the selected week to be the
  //latest possible week
  getWeeks() {
    this.weeks = [];
    for(var i = 0; i<this.selectedBatch.weeks; i++){
      this.weeks.push(i+1);
    }
    this.selectedWeek = this.selectedBatch.weeks;
  }

  //selectYear runs once the user selects a particular year from the dropdown menu
  //calls the getBatchesByYear function in the batchService
  //resets the local batches to reflect the new selected year.
  selectYear(event: number) {
    this.selectedYear = event;
    this.batchService.selectedYear = this.selectedYear;
    this.batchService.getBatchesByYear(event)
    .subscribe(result => {
      this.batches = result;
    });
  }

  //selectBatch occurs after the user selects a batch from the dropdown menu
  //calls the getWeeks() function so it returns the new batches correct amount of weeks
  selectBatch(event: Batch) {
    this.selectedBatch = event;
    this.batchService.selectedBatch = this.selectedBatch;
    this.getWeeks();
  }

  //showActiveWeek returns the string "active" if the particular week is the selected week
  //if active, the week will appear differently in HTML
  showActiveWeek(week: number) {
    if (week==this.selectedWeek) {
      return "active";
    }
  }

  //selectWeek runs when a user selects a different week for a given batch
  //it also changes the batchService's selectedWeek so the associate component can update
  //based on user input
  selectWeek(event: number) {
    this.selectedWeek = event;
    this.batchService.selectedWeek = event;
  }

  //addWeek increments the amount of weeks in the current batch, selects the newly created week
  //and calls the batchService's putBatch function to update batch in the database
  addWeek() {
    var last = this.weeks[this.weeks.length-1];
    this.weeks.push(last+1);
    this.selectedWeek=last+1;
    this.selectedBatch.weeks++;
    this.batchService.putBatch(this.selectedBatch).subscribe(result => {
      
    });
  }

}
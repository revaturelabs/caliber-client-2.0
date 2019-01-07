import { Component, OnInit , ElementRef, ViewChild, SimpleChanges} from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Observable, Subject } from 'rxjs';
import { Batch } from 'src/app/Batch/type/batch';
import {BatchService} from 'src/app/Batch/batch.service';
import { Note } from '../../types/Note';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})

export class OverallComponent implements OnInit {
  public overallqc : Overallqc;
  CurrentNotes;
  CurrentWeek;
  CurrentBatch;
  selectedWeek;
  qcStatus: string;
  noteid: Number;
  content:string;
  batchid: Number;
  week: Number;
  traineeid: Number =0;
  type: string = "QC_BATCH";
  QCStatus: string="Undefined";
  note;
  qcStatusTypes = [];
	batch: Batch;
	qcBatchAssess: number;
	colors: any = ['#19ad17', '#f9e903', '#ea2724'];
	happy: '#b9b9ba';
	meh: '#b9b9ba';
	sad: '#b9b9ba';
	generatedFace: number;
@ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;

constructor(public _overallqcService: OverallService ,
  public auditService: AuditService, public batchService: BatchService) { }
	showFloppy: boolean = true;
	showSaving: boolean = false;
	showCheck: boolean = false;
 
 

 ngOnInit() {
  this.getCalculatedAverage();
  this.overallqc=this._overallqcService.getter();
  this.CurrentWeek = 1;
  this.CurrentBatch = this.batchService.selectedBatch;
 // this.overallqc.week = this.batchService.selectedWeek;
 // this.overallqc.batchid = this.batchService.selectedBatch.batchId
 
  this._overallqcService.getOverallQC(this.overallqc.week,this.overallqc.batchid).subscribe(overallqc => this.overallqc.content = overallqc.content);

  if(this.batchService.selectedBatch.batchId != undefined ){
  this.overallqc.batchid =this.batchService.selectedBatch.batchId;
  }
  else{
  this.overallqc.batchid =0;
  }
  if(this.batchService.selectedWeek != undefined){
    this.overallqc.week=this.batchService.selectedWeek;
  }
  else{
  this.overallqc.week =1;
}

this._overallqcService.getOverallQC(this.overallqc.week,this.overallqc.batchid).subscribe(overallqc => this.overallqc.content = overallqc.content);

 
  
 }

 faceColorOnInit(genF) {
  this.generatedFace = genF;
}

getCalculatedAverage() {

  this._overallqcService.getOverallSmileyStatus().subscribe( (n) => {
  this.note = n;
  this.figure(n);
});
}

figure(n) {
  console.log(n);
  if(n.qcStatus == 'Good') {
    this.faceColorOnInit(1);
  }
  if(n.qcStatus == 'Average') {
    this.faceColorOnInit(2);
  }
  if(n.qcStatus == 'Poor') {
    this.faceColorOnInit(3);
  }
  if(n.qcStatus == 'Undefined') {
    this.faceColorOnInit(null);
  }

  this._overallqcService.getOverallSmileyStatus().subscribe(overallqc => this.overallqc.QCStatus = overallqc.QCStatus);
  console.log(this.overallqc);
  if (this.overallqc.QCStatus = 'Good') {
    this.faceColorOnInit(1);
  }
  if (this.overallqc.QCStatus = 'Average') {
    this.faceColorOnInit(2);
  }
  if (this.overallqc.QCStatus = 'Poor') {
    this.faceColorOnInit(3);
  }
  if (this.overallqc.QCStatus = 'Undefined') {
    this.faceColorOnInit(3);
  }

}

changeFaceColor(num) {
  this.happy = '#b9b9ba';
  this.meh = '#b9b9ba';
  this.sad = '#b9b9ba';
  switch (num) {
    case 1:
      this.happy = this.colors[0];
      const i = this.overallqc.QCStatus = 'Good';
      this._overallqcService.updateOverallStatus(i);
      break;
    case 2:
      this.meh = this.colors[1];
      const a = this.overallqc.QCStatus = 'Average';
      this._overallqcService.updateOverallStatus(a);
      break;
    case 3:
      this.sad = this.colors[2];
      const b = this.overallqc.QCStatus = 'Poor';
      this._overallqcService.updateOverallStatus(b);
      break;
    default:
      break;
  }
}

pickOverallStatus(batch, pick) {
  console.log(batch, pick);
  this.batch = batch;
  this.qcBatchAssess = pick;
}

saveQCandTrainee() {

  console.log('clicked');

  this.showFloppy = !this.showFloppy;

  setTimeout(() => {
    console.log('disable textArea');
    this.auditService.processingNote = true;
  }, 100);

  setTimeout(() => {
    console.log('showSaving');
    this.showFloppy = false;
    this.showSaving = true;
    this.auditService.processingNote = false;
  }, 500);

  setTimeout(() => {
    console.log('showChecking');
    this.showSaving = false;
    this.showCheck = true;
  }, 2000);

  setTimeout(() => {
    console.log('showChecking');
    this.showSaving = false;
    this.showCheck = false;
    this.showFloppy = true;
  }, 4000);

}

 saveQCNotes(overallqc:Overallqc){ 
  this.overallqc=this._overallqcService.getter();                                          
  this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
  this._overallqcService.getOverallQC(this.batchService.selectedWeek,this.overallqc.batchid).subscribe(overallqc => this.overallqc.content = overallqc.content);

   if(this.overallqc.content==undefined || this.overallqc.content==""){
   
    this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;

     this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc)=>{
       console.log(overallqc); 
     });

   }else{
    this._overallqcService.getOverallQC(this.batchService.selectedWeek,this.batchService.selectedBatch.batchId).subscribe(overallqc => this.overallqc.content = overallqc.content);
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
     this._overallqcService.updateOverallQC(this.overallqc).subscribe((overallqc)=>{
       console.log(overallqc); 
     });
 }
 }

 checkForChanges(): boolean {
  if (this.CurrentWeek !== this.batchService.selectedWeek) {
    this.CurrentWeek = this.batchService.selectedWeek;
    this.PopulateNotes();
  }
  if (this.batchService.selectedBatch.batchId !== this.CurrentBatch) {
    this.CurrentBatch = this.batchService.selectedBatch.batchId;
    this.PopulateNotes();
  }
  return true;
}

PopulateNotes() {
  this.auditService.getCurrentNotes(this.batchService.selectedWeek,
    this.batchService.selectedBatch.batchId).subscribe(overallqc => {
      console.log(this.CurrentBatch + ' ' + this.CurrentWeek);
      console.log(overallqc);
      this.CurrentNotes = overallqc;
      console.log(this.CurrentNotes);
     });
}

updateQCNote(overallqc: Overallqc) {
  console.log(overallqc);
  this.auditService.processingNote = true;
  this.auditService.updateOverallqc(overallqc).subscribe(n => {
    console.log('saving...');
    console.log(n);
    this.auditService.processingNote = false;
    this.auditService.noteUpdate = true;
    for (let i = 0; i < this.CurrentNotes.length; i++) {
      if (this.CurrentNotes[i].noteId === n.noteid) {
        this.CurrentNotes[i] = n;
      }
    }
  });
}
}

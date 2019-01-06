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
	qcStatus: string;

 ngOnInit() {
   this.overallqc=this._overallqcService.getter();
   this.getCalculatedAverage();
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
 saveQCNotes(){
   this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
  // this.overallqc.noteId = 0;
   if(this.overallqc.content==undefined){
    
    this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
   // this.overallqc.noteId = 0;
     this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc)=>{
       console.log(overallqc); 
     });

   }else{
    // @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
    // this.overallqc.noteId = 0;
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
}
/*export class OverallComponent implements OnInit {
   public overallqc : Overallqc;
   public note : Note;
   CurrentNotes;
   CurrentWeek = 1;
 @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
constructor(private _overallqcService: OverallService, public _auditService:AuditService, public _BatchService:BatchService) { }

  ngOnInit() {
   // this.CurrentNotes = this.note.getCurrentNotes();
   // this.note=this._auditService.getBatchesByYear();
    if(this.note.content != ""){
      this.note.content = this.qcBatchNotes.nativeElement.innerHTML;
      this.note.batchId = this._BatchService.selectedBatch.batchId;
      this.note.week = this._BatchService.selectedWeek;
this.note= this._auditService.getCurrentNotes(this.note.week,this.note.batchId);
    }
    if (this.note != null || this.note != undefined){
      this.note.content = this.qcBatchNotes.nativeElement.innerHTML;
    }

  }

  saveQCNotes(note){
  //  this._overallqcService.setter(this.overallqc);
  //console.log(this.overallqc);
 
    if(this.note.content==""){
     this.note.content = this.qcBatchNotes.nativeElement.innerHTML;
    // this._auditService.setter(this.overallqc);
      this._auditService.updateNote(this.note).subscribe((note)=>{
        console.log(note); 
      });

    }else if(this.note.content != "") {
     // this._auditService.setter(this.overallqc);
      this._auditService.updateNote(this.note).subscribe((note)=>{
       
        console.log(note); 

      });
    }
   
  }
  
  }

*/

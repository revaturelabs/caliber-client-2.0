import { Component, OnInit , ElementRef, ViewChild, SimpleChanges} from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
   private overallqc : Overallqc;
   CurrentNotes;
   CurrentWeek = 1;
   CurrentBatch = 0;
 @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
constructor(private _overallqcService: OverallService, private _auditService:AuditService) { }

  ngOnInit() {
    this.overallqc=this._overallqcService.getter();
    //this.overallqc = this._overallqcService.getOverallQC(5,2150);
    if (this._overallqcService.getter() != null || this._overallqcService.getter() != undefined){
      this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
    }

  }

  saveQCNotes(overallqc:Overallqc){
    this._overallqcService.setter(this.overallqc);
  console.log(overallqc);
 
    if(this.overallqc.content==""){
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
     this._overallqcService.setter(this.overallqc);
      this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc)=>{
        console.log(overallqc); 
      });

    }else if(this.overallqc.content != "") {
      this._overallqcService.setter(this.overallqc);
      this._overallqcService.updateOverallQC(this.overallqc).subscribe((overallqc)=>{
       
        console.log(overallqc); 

      });
    }
   
  }
  
  }

   /* checkForChanges(): boolean {
    if (this.CurrentWeek !== this.auditService.selectedWeek) {
      this.CurrentWeek = this.auditService.selectedWeek;
      this.PopulateNotes();
      if (this.auditService.selectedBatch.batchId !== this.CurrentBatch) {
        this.CurrentBatch = this.auditService.selectedBatch.batchId;
        this.PopulateNotes();
      }
      return true;
    }
    }
    PopulateNotes() {
      this.auditService.getCurrentNotes(this.auditService.selectedWeek,
        this.auditService.selectedBatch.batchId).subscribe(note => {
          console.log(this.CurrentBatch + ' ' + this.CurrentWeek);
          console.log(note);
          this.CurrentNotes = note;
          console.log(this.CurrentNotes);
         });
    }
    updateQCNote(note: Note) {
      console.log(note);
      this.auditService.updateNote(note).subscribe(n => {console.log(n); } );
    }
    noteOnBlur(selectedNoteId: number): void {
      for (let i = 0; i < this.CurrentNotes.length; i++) {
        if (this.CurrentNotes[i].noteId === selectedNoteId) {
          this.updateQCNote(this.CurrentNotes[i]);
        }
      }
    }
*/
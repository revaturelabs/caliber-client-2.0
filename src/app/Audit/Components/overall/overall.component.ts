import { Component, OnInit , ElementRef, ViewChild, SimpleChanges} from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Observable, Subject } from 'rxjs';
import { Batch } from 'src/app/Batch/type/batch';
import {BatchService} from 'src/app/Batch/batch.service';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
   public overallqc : Overallqc;
   CurrentNotes;
   CurrentWeek = 1;
 @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
constructor(private _overallqcService: OverallService, public _auditService:AuditService, public _BatchService:BatchService) { }

  ngOnInit() {
    this.overallqc=this._overallqcService.getter();
    if(this.overallqc.content != ""){
     
      this.overallqc.batchid = this._BatchService.selectedBatch.batchId;
      this.overallqc.week = this._BatchService.selectedWeek;
this.overallqc= this._auditService.getCurrentNotes(this.overallqc.week,this.overallqc.batchid);
    }
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



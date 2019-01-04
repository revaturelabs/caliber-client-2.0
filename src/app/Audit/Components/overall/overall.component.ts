import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.component.html',
  styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
   private overallqc : Overallqc;
 @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
constructor(private _overallqcService: OverallService) { }

  ngOnInit() {
    this.overallqc=this._overallqcService.getter();

    if (this._overallqcService.getter() != null || this._overallqcService.getter() != undefined){
      this.overallqc.note = this.qcBatchNotes.nativeElement.innerHTML;
    }

  }

  saveQCNotes(){
  
    this.overallqc.batchid = 0;
    this.overallqc.week = 0;
    this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
    this.overallqc.noteid = 7;
    if(this.overallqc.content==""){
      this.overallqc = this._overallqcService.getOverallQC(2150, 5);
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
    // this.overallqc.noteid = 2000;
    // this.overallqc.batchid = 3000;
    // this.overallqc.week = 6;
      this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc)=>{
        console.log(overallqc); 
      });

    }else if(this.overallqc.content != "") {
     
    // this.overallqc = this._overallqcService.getter(); //
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
      this.overallqc.noteid = 4000;
      this.overallqc.batchid = 5000;
      this.overallqc.week = 6;
      this._overallqcService.updateOverallQC(this.overallqc).subscribe((overallqc)=>{
        console.log(overallqc); 

      });
    }
  }
  }

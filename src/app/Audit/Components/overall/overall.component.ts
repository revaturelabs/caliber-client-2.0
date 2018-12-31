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
   private overallqc:Overallqc;
 @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
constructor(private _overallqcService: OverallService) { }

  ngOnInit() {
    this.overallqc=this._overallqcService.getter();
  }

  saveQCNotes(){
    this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
    this.overallqc.noteId = 0;
    if(this.overallqc.content==undefined){
     
     this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
     this.overallqc.noteId = 0;
      this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc)=>{
        console.log(overallqc); 
      });

    }else{
     // @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
      this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
      this.overallqc.noteId = 0;
      this._overallqcService.updateOverallQC(this.overallqc).subscribe((overallqc)=>{
        console.log(overallqc); 
      });
  }
  }
}
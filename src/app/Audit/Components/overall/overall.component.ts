import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	private overallqc: Overallqc;

	@ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;

	showFloppy: boolean = true;
	showSaving: boolean = false;
	showCheck: boolean = false;

  constructor(private _overallqcService: OverallService,
              private auditService: AuditService) { }

	ngOnInit() {
		this.overallqc = this._overallqcService.getter();
	}

	saveQCandTrainee() {

		console.log('clicked');

    this.showFloppy = !this.showFloppy;
    setTimeout(() => {
      console.log('disable textArea');
      this.auditService.ProcessingNote = true;
    }, 100);

		setTimeout(() => {
      console.log('showSaving');
      this.showFloppy = false;
      this.showSaving = true;
      this.auditService.ProcessingNote = false;
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

	saveQCNotes() {
		this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
		this.overallqc.noteId = 0;
		if (this.overallqc.content == undefined) {

			this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
			this.overallqc.noteId = 0;
			this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc) => {
				console.log(overallqc);
			});

		} else {
			// @ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
			this.overallqc.content = this.qcBatchNotes.nativeElement.innerHTML;
			this.overallqc.noteId = 0;
			this._overallqcService.updateOverallQC(this.overallqc).subscribe((overallqc) => {
				console.log(overallqc);
			});
		}
	}
}
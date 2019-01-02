import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Batch } from 'src/app/Batch/type/batch';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	private overallqc: Overallqc;
	qcStatusTypes = [];
	batch: Batch;
	qcBatchAssess: number;
	colors: any = ['#19ad17', '#f9e903', '#ea2724'];
	happy: '#b9b9ba';
	meh: '#b9b9ba';
	sad: '#b9b9ba';
	
	@ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
	
	constructor(private _overallqcService: OverallService) { }

	ngOnInit() {
		this.overallqc = this._overallqcService.getter();
	}

	changeFaceColor(num) {
		this.happy = '#b9b9ba';
		this.meh = '#b9b9ba';
		this.sad = '#b9b9ba';
		switch (num) {
			case 1:
				this.happy = this.colors[0];
				break;
			case 2:
				this.meh = this.colors[1];
				break;
			case 3:
				this.sad = this.colors[2];
				break;
			default:
				break;
		}
		this._overallqcService.createOverallQC(this.overallqc).subscribe((overallqc) => {
			console.log(overallqc);
		});
	}

	pickOverallStatus(batch, pick) {
		console.log(batch, pick);
		this.batch = batch;
		this.qcBatchAssess = pick;
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

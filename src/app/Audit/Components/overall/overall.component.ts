import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Batch } from 'src/app/Batch/type/batch';
import { Note } from '../../types/Note';
import { interval, Subscription } from 'rxjs';
import { BatchService } from 'src/app/Batch/batch.service';



@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	public overallqc: Overallqc;
	note: Note;
	CurrentWeek;
	CurrentBatch;

	qcStatusTypes = [];
	batch: Batch;
	qcBatchAssess: number;
	colors: any = ['#19ad17', '#f9e903', '#ea2724'];
	happy: '#b9b9ba';
	meh: '#b9b9ba';
	sad: '#b9b9ba';
	generatedFace: number;
	subscription: Subscription;

	@ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
	overallQc = new Overallqc();
	showFloppy: boolean = true;
	showSaving: boolean = false;
	showCheck: boolean = false;
	qcStatus: string;
	updateValue: boolean = false;

	constructor(public _overallqcService: OverallService,
		public auditService: AuditService, public batchService: BatchService) { }

	ngOnInit() {
		this.overallqc = this._overallqcService.getter();
		this.getCalculatedAverage();
	}



	faceColorOnInit(genF) {
		this.generatedFace = genF;
	}

	checkForChanges(): boolean {
		console.log(this.CurrentWeek + " " + this.CurrentBatch);
		if (this.CurrentWeek !== this.batchService.selectedWeek) {
			this.CurrentWeek = this.batchService.selectedWeek;
			this.getCalculatedAverage();
			this.auditService.noteUpdate = false;
		  }
		  if (this.batchService.selectedBatch.batchId !== this.CurrentBatch) {
			this.CurrentBatch = this.batchService.selectedBatch.batchId;
			this.getCalculatedAverage();
			this.auditService.noteUpdate = false;
		  }
		if (this.updateValue !== this.auditService.noteUpdate) {
			this.updateValue = this.auditService.noteUpdate;
			this.getCalculatedAverage();
			this.auditService.noteUpdate = false;
		}

		return true;
	}



	getCalculatedAverage() {

		this._overallqcService.getOverallSmileyStatus(this.batchService.selectedBatch.batchId, this.batchService.selectedWeek).subscribe((n) => {
			console.log(this.note);
			this.note = n;
			this.figure(n);
			console.log(n);
		});
	}

	figure(n) {
		console.log(n);
		// this.happy = '#b9b9ba';
		// this.meh = '#b9b9ba';
		// this.sad = '#b9b9ba';
		if (n.qcStatus == 'Good') {
			// this.meh = '#b9b9ba';
			// this.sad = '#b9b9ba';
			this.changeFaceColor(1);
			console.log(n);
		}
		if (n.qcStatus == 'Average') {
			// this.happy = '#b9b9ba';
			// this.sad = '#b9b9ba';
			this.changeFaceColor(2);
		}
		if (n.qcStatus == 'Poor') {
			// this.happy = '#b9b9ba';
			// this.meh = '#b9b9ba';
			this.changeFaceColor(3);
		}
		if (n.qcStatus == 'Undefined') {
			this.changeFaceColor(null);
		}
	}

	updateGreen(note: Note) {
		note.qcStatus = "Good";
		console.log(note);
		this.auditService.updateNote(note).subscribe((n) => {
			this.note = n;
			console.log(n);

		});
	}

	updateYellow(note: Note) {
		note.qcStatus = "Average";
		this._overallqcService.updateOverallStatus(note).subscribe((n) => {
			this.note = n;
		});

	}

	updateRed(note: Note) {
		note.qcStatus = "Poor";
		this._overallqcService.updateOverallStatus(note).subscribe((n) => {
			this.note = n;
		})
	}

	changeFaceColor(num) {
		this.happy = '#b9b9ba';
		this.meh = '#b9b9ba';
		this.sad = '#b9b9ba';
		switch (num) {
			case 1:
				this.happy = this.colors[0];
				console.log(this.note);
				this.updateGreen(this.note);

				console.log("logging");
				break;
			case 2:
				this.meh = this.colors[1];
				this.updateYellow(this.note);
				break;
			case 3:
				this.sad = this.colors[2];
				this.updateRed(this.note);
				//this._overallqcService.updateOverallStatus(b);
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
	noteOnBlur() {
		console.log(this.note);
		this.auditService.processingNote = true;
		this.auditService.updateNote(this.note).subscribe((n) => {
			this.auditService.processingNote = false;
			this.note = n;
			console.log(n);
		});
	}
}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Overallqc } from '../../../overallqc';
import { AuditService } from '../../Services/audit.service';
import { OverallService } from '../../Services/overall.service';
import { Batch } from 'src/app/Batch/type/batch';
import { Note } from '../../types/Note';


@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	public overallqc: Overallqc;
	note: Note;

	qcStatusTypes = [];
	batch: Batch;
	qcBatchAssess: number;
	colors: any = ['#19ad17', '#f9e903', '#ea2724'];
	happy: '#b9b9ba';
	meh: '#b9b9ba';
	sad: '#b9b9ba';
	generatedFace: number;

	@ViewChild('qcBatchNotes') qcBatchNotes: ElementRef;
	overallQc = new Overallqc();
	showFloppy: boolean = true;
	showSaving: boolean = false;
	showCheck: boolean = false;
	qcStatus: string;

	constructor(public _overallqcService: OverallService,
		public auditService: AuditService) { }

	ngOnInit() {
		this.overallqc = this._overallqcService.getter();
		this.getCalculatedAverage();
		//this.faceColorOnInit();
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
	}

	updateGreen(note: Note) {
		note.qcStatus = "Green";
		console.log(note);
		this.auditService.updateNote(note).subscribe ( (n) => {
			this.note = n;
			console.log(n);
			
		});
	}

	updateYellow(note: Note) {
		note.qcStatus = "Yellow";
		this._overallqcService.updateOverallStatus(note).subscribe( (n) => {
			this.note = n;
		});

	}

	updateRed(note: Note) {
		note.qcStatus = "Red";
		this._overallqcService.updateOverallStatus(note).subscribe( (n) => {
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

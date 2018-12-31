import { Component, OnInit } from '@angular/core';
import { Batch } from 'src/app/Batch/type/batch';

@Component({
	selector: 'app-overall',
	templateUrl: './overall.component.html',
	styleUrls: ['./overall.component.css']
})
export class OverallComponent implements OnInit {
	qcStatusTypes = [];
	batch: Batch;
	qcBatchAssess: number;
	showFloppy: boolean = true;
	showSaving: boolean = false;
	showCheck: boolean = false;
	constructor() { }

	ngOnInit() {
	}

	pickOverallStatus(batch, pick) {

		this.batch = batch;
		this.qcBatchAssess = pick;

	}

	saveQCandTrainee() {
		console.log('clicked');

		this.showFloppy = !this.showFloppy;

		setTimeout(() => {
			console.log('showSaving');
			this.showSaving = true;
		}, 480);

		this.showCheckIcon();
	}

	showCheckIcon() {

		setTimeout(() => {
			console.log('showChecking');
			this.showSaving = false;
			this.showCheck = true;
		}, 2000);

		this.showFloppySave();

	}

	showFloppySave() {

		setTimeout(() => {
			console.log('showChecking');
			this.showSaving = false;
			this.showCheck = false;
			this.showFloppy = true;
		}, 4000);

	}


}

import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { Note } from '../../types/Note';
import { Trainee } from '../../types/Trainee';
import { BatchService } from 'src/app/Batch/batch.service';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  CurrentNotes: Note[];
  CurrentWeek;
  CurrentBatch;



  // List of test categories
  categories = [
    {
      name: 'Java',
    },
    {
      name: 'MySQL'
    }
  ];

  // Unimplemented functions
  constructor(public auditService: AuditService, public batchService: BatchService) {}
  ngOnInit() {
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
      this.batchService.selectedBatch.batchId).subscribe(notes => {
        console.log(this.CurrentBatch + ' ' + this.CurrentWeek);

        this.CurrentNotes = notes;

        this.CurrentNotes.forEach(note => {
          note.updating = false;
        });
    });
  }

  cycleFlag(selectedNoteId: number): void {
    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.CurrentNotes.length; i++) {
      console.log(this.CurrentNotes[i].trainee.flagStatus);
      // Find the clicked note
      if (this.CurrentNotes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.CurrentNotes[i].trainee.flagStatus) {
          case 'NONE':
            newStatus = 'RED';
            break;
          case 'RED':
            newStatus = 'GREEN';
            break;
          case 'GREEN':
            newStatus = 'NONE';
            break;
          case null:
            newStatus = 'RED';
            break;
        }

        // Update the status
        this.CurrentNotes[i].trainee.flagStatus = newStatus;
        this.updateTrainee(this.CurrentNotes[i].trainee);
      }
    }
  }

  cycleFlagNotesInput(selectedNoteId: number, enable: boolean): void {

    for (let i = 0; i < this.CurrentNotes.length; i++) {

      if (this.CurrentNotes[i].noteId === selectedNoteId) {
          this.CurrentNotes[i].noteFlagInputActive = enable;
      }
    }
  }

  cycleIF(selectedNoteId: number): void {
    for (let i = 0; i < this.CurrentNotes.length; i++) {
      if (this.CurrentNotes[i].noteId === selectedNoteId) {
        let newStatus = '';

        switch (this.CurrentNotes[i].qcStatus) {
          case 'Undefined':
            newStatus = 'Superstar';
            break;
          case 'Superstar':
            newStatus = 'Good';
            break;
          case 'Good':
            newStatus = 'Average';
            break;
          case 'Average':
            newStatus = 'Poor';
            break;
          case 'Poor':
            newStatus = 'Undefined';
            break;
        }

        this.CurrentNotes[i].qcStatus = newStatus;

        this.updateQCNote(this.CurrentNotes[i]);
      }
    }
  }

  // Disables the associated notes text area box for 1 second.
  noteOnBlur(selectedNoteId: number): void {
    for (let i = 0; i < this.CurrentNotes.length; i++) {
      if (this.CurrentNotes[i].noteId === selectedNoteId) {
        this.updateQCNote(this.CurrentNotes[i]);
      }
    }
  }

  updateFlagComment(selectedNoteId: number) {
    for (let i = 0; i < this.CurrentNotes.length; i++) {
      if (this.CurrentNotes[i].noteId === selectedNoteId) {
        console.log(this.CurrentNotes[i].trainee);

        this.CurrentNotes[i].updating = true;
        this.updateTrainee(this.CurrentNotes[i].trainee);
      }
    }
  }

  updateTrainee(trainee: Trainee) {
    this.auditService.updateTrainee(trainee).subscribe(_trainee => {


      this.CurrentNotes.forEach(note => {

        if (note.traineeId === _trainee.traineeId){

          note.updating = false;

        }

      });

     });
  }

  updateQCNote(note: Note) {
    console.log(note);
    this.auditService.noteUpdate = true;

    note.updating = true;

    this.auditService.updateNote(note).subscribe(n => {
      console.log('saving...');
      console.log(n);

      for (let i = 0; i < this.CurrentNotes.length; i++) {
        if (this.CurrentNotes[i].noteId === n.noteId) {
          this.CurrentNotes[i] = n;
          this.CurrentNotes[i].updating = false;
        }
      }
    });
  }


}

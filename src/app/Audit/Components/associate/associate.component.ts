import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuditService } from '../../Services/audit.service';
import { Batch } from 'src/app/Batch/type/batch';
import { Note } from '../../types/Note';
import { Trainee } from '../../types/Trainee';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  CurrentNotes;
  CurrentWeek = 1;
  CurrentBatch = 0;

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
  constructor(private auditService: AuditService) {}
  ngOnInit() {
    this.CurrentWeek = 1;
  }

  checkForChanges(): boolean {
    if (this.CurrentWeek !== this.auditService.selectedWeek) {
      this.CurrentWeek = this.auditService.selectedWeek;
      this.PopulateNotes();
    }
    if (this.auditService.selectedBatch.batchId !== this.CurrentBatch) {
      this.CurrentBatch = this.auditService.selectedBatch.batchId;
      this.PopulateNotes();
    }
    return true;
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
        this.updateTrainee(this.CurrentNotes[i].trainee);
      }
    }
  }

  updateTrainee(trainee: Trainee) {
    this.auditService.ProcessingNote = true;
    this.auditService.updateTrainee(trainee).subscribe(t => {this.auditService.ProcessingNote = false; } );
  }

  updateQCNote(note: Note) {
    this.auditService.ProcessingNote = true;
    this.auditService.updateNote(note).subscribe(n => {console.log('saving...');
    this.auditService.ProcessingNote = false; } );

  }
}

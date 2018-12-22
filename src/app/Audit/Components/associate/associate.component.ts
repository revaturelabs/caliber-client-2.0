import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  // List of test categories
  categories = [
    {
      name: 'Java'
    }
  ];

  // List of test notes
  notes = [
    {
      qcStatus: 'Undefined',
      noteId: 0,
      trainee: {
        name: 'Forsberg, Justin',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Superstar',
      noteId: 1,
      trainee: {
        name: 'Bill Boe',
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Good',
      noteId: 2,
      trainee: {
        name: 'Forsberg, Justin',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    },
    {
      qcStatus: 'Average',
      noteId: 3,
      trainee: {
        name: 'Bill Boe',
        flagNotes: '',
        flagStatus: 'RED'
      }
    },
    {
      qcStatus: 'Poor',
      noteId: 4,
      trainee: {
        name: 'Bill Boe',
        flagNotes: '',
        flagStatus: 'NONE'
      }
    }
  ];

  // Unimplemented functions
  constructor() { }
  ngOnInit() { }

  // Change the trainee flag status
  changeFlag(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Determine the new status string
        switch (this.notes[i].trainee.flagStatus) {
          case 'NONE':
            this.notes[i].trainee.flagStatus = 'RED';
            break;

          case 'RED':
            this.notes[i].trainee.flagStatus = 'NONE';
            break;
        }
      }
    }
  }

  noteOnBlur(selectedNoteId: number): void {

    console.log('test');

    $('#note-textarea-' + selectedNoteId).prop('disabled', true);

    setInterval(this.enableNoteAfterUpdate, 1000, selectedNoteId);
  }

  enableNoteAfterUpdate(selectedNoteId: number): void {

    //$('#note-textarea-' + selectedNoteId).prop('disabled', false);
  }

  // Change the Individual Feedback Status
  changeIF(selectedNoteId: number): void {

    // Loop through each note in notes until the target is found
    for (let i = 0; i < this.notes.length; i++) {

      // Find the clicked note
      if (this.notes[i].noteId === selectedNoteId) {

        // Create placeholder for new status string
        let newStatus = '';

        // Determine the new status string
        switch (this.notes[i].qcStatus) {
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

        this.notes[i].qcStatus = newStatus;
      }
    }
  }
}

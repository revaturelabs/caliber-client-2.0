import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {

  // List of test categories
  categories = [
    'Java'
  ];

  // List of test trainees
  trainees = [
    {
      name: 'Forsberg, Justin'
    },
    {
      name: 'Bill Boe'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

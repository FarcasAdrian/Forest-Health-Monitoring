import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mat-toolbar-message',
  templateUrl: './mat-toolbar-message.component.html',
  styleUrls: ['./mat-toolbar-message.component.css']
})
export class MatToolbarMessageComponent implements OnInit {

  @Input() public message: string;

  constructor() { }

  ngOnInit() {
  }

}

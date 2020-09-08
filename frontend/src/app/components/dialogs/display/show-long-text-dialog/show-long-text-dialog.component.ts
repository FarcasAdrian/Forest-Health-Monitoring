import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-long-text-dialog',
  templateUrl: './show-long-text-dialog.component.html',
  styleUrls: ['./show-long-text-dialog.component.css']
})
export class ShowLongTextDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}

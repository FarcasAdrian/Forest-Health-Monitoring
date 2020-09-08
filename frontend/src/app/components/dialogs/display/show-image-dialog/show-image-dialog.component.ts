import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-image-dialog',
  templateUrl: './show-image-dialog.component.html',
  styleUrls: ['./show-image-dialog.component.css']
})
export class ShowImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }

}

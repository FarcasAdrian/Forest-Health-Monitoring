import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.css']
})
export class ListDialogComponent implements OnInit {

  public localData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.localData = this.data;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-issue-dialog',
  templateUrl: './new-issue-dialog.component.html',
  styleUrls: ['./new-issue-dialog.component.css']
})
export class NewIssueDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewIssueDialogComponent>) { }

  ngOnInit() {
  }

}

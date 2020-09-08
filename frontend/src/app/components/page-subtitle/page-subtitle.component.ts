import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-page-subtitle',
  templateUrl: './page-subtitle.component.html',
  styleUrls: ['./page-subtitle.component.css']
})
export class PageSubtitleComponent implements OnInit {

  @Input() public subtitle: string;

  constructor() { }

  ngOnInit() {
  }

}

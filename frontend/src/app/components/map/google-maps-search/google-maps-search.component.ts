import { Component, OnInit } from '@angular/core';
import { GoogleMapsService } from '../../../services/google-maps.service';

@Component({
  selector: 'app-google-maps-search',
  templateUrl: './google-maps-search.component.html',
  styleUrls: ['./google-maps-search.component.css']
})
export class GoogleMapsSearchComponent implements OnInit {

  constructor(private googleMapsService: GoogleMapsService) {
  }

  ngOnInit() {
  }
}

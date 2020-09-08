import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleMapsService } from '../../../../services/google-maps.service';

@Component({
  selector: 'app-forest-location-dialog',
  templateUrl: './forest-location-dialog.component.html',
  styleUrls: ['./forest-location-dialog.component.css']
})
export class ForestLocationDialogComponent implements OnInit {

  public localData;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    private googleMapsService: GoogleMapsService) {
    this.localData = { ...this.data };
    this.googleMapsService.findForestOnMap(this.localData.forest_name, this.localData.surface);
  }

  ngOnInit() {
  }

}

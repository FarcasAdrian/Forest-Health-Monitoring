import { Component, OnInit } from '@angular/core';
import { DatabaseRequestService } from '../../../services/database-request.service';
import { GoogleMapsService } from '../../../services/google-maps.service';

declare const google: any;

export interface MarkerLabel {
  color: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  text: string;
}

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {

  public newLocationCoordinates: any = [];
  public mapZonesCoordinates: string[];
  public displayNewLocationCoordinates = false;
  public displayAlertMessage = false;

  public clicked = false;

  public lat;
  public lng;
  public label;
  public location = {};

  constructor(private databaseRequest: DatabaseRequestService,
    private googleMapsService: GoogleMapsService) {
  }

  ngOnInit() {
    this.databaseRequest.requestForestsData().subscribe((data: any) => {
      this.mapZonesCoordinates = data.geometry.coordinates as string[];
    });
  }

  public onMapReady(map) {
    // this.initDrawingManager(map);
  }

  public show(event) {
    this.lat = event.latLng.lat();
    this.lng = event.latLng.lng();
    this.label = 'test';
    this.clicked = true;
  }

  public initDrawingManager(map: any) {
    const options = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ['polygon'],
      },
      polygonOptions: {
        draggable: true,
        editable: true,
        geodesic: true,
        strokeColor: '#FFBC00',
        fillColor: '#FFBC00'
      },
      drawingMode: google.maps.drawing.OverlayType.POLYGON
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'polygoncomplete', (polygon) => {
      const len = polygon.getPath().getLength();
      for (let i = 0; i < len; i++) {
        const vertex = polygon.getPath().getAt(i);
        const vertexLatLng = { latitude: vertex.lat(), longitude: vertex.lng() };
        this.newLocationCoordinates.push(vertexLatLng);
      }
      this.newLocationCoordinates.push(this.newLocationCoordinates[0]);
      this.displayNewPolygonCoordinates();
    });
  }

  public displayNewPolygonCoordinates() {
    this.displayNewLocationCoordinates = !this.displayNewLocationCoordinates;
    this.ngOnInit();
  }

  public savePolygonInDB() {
    const forestDetails = [{ coordinates: this.newLocationCoordinates }, { locationName: this.googleMapsService.locationName }];
    this.databaseRequest.sendPolygonToDB(forestDetails).subscribe(
      (res: Response) => {
        console.log(res);
        this.newLocationCoordinates = [];
        this.displayAlertMessage = !this.displayAlertMessage;
        this.displayNewPolygonCoordinates();
      }
    );
  }
}

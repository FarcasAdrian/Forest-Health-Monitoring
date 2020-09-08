import {Injectable} from '@angular/core';
import {apiKey, proxyLink} from '../environments/enviroments';
import {DatabaseRequestService} from './database-request.service';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  isValidLocation = true;
  locationName: string;
  zoom = 7;

  center: any = [
    {
      latitude: 45.789348,
      longitude: 24.810425
    }
  ];

  constructor(private databaseRequestService: DatabaseRequestService) {
  }

  findForestOnMap(locationName, surface = 13) {
    this.databaseRequestService.requestForestLocation(proxyLink
      + 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='
      + locationName.replace(' ', '%20')
      + '&inputtype=textquery&language=ro&fields=name,geometry&key='
      + apiKey)
      .subscribe((data: any) => {
        if (data.status === 'OK') {
          this.locationName = data.candidates[0].name;
          const dataResult = data.candidates[0].geometry.location;
          this.center[0].latitude = dataResult.lat;
          this.center[0].longitude = dataResult.lng;
          this.zoom = 13;

          if (surface < 1000) {
            this.zoom = 14;
          } else if (surface > 1500) {
            this.zoom = 10;
          }
        } else {
          this.isValidLocation = false;
        }
      });
  }
}

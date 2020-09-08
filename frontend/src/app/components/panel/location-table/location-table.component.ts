import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RemoveFieldDialogComponent } from '../../dialogs/remove/remove-field-dialog/remove-field-dialog.component';
import { AlertService } from 'src/app/services/alert.service';
import { EditCoordinatesDialogComponent } from '../../dialogs/edit/edit-coordinates-dialog/edit-coordinates-dialog.component';
import { NewCoordinatesDialogComponent } from '../../dialogs/create/new-coordinates-dialog/new-coordinates-dialog.component';
import { UserPanelService } from 'src/app/services/user-panel.service';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css']
})
export class LocationTableComponent implements OnInit {

  public dataSource;
  public isEmptyDataSource = true;

  constructor(private dialog: MatDialog,
    private alertService: AlertService,
    private userPanelService: UserPanelService) {
  }

  ngOnInit() {
    this.userPanelService.assigmentForestDataSource.subscribe(tableSource => this.dataSource = tableSource);
  }

  public removeCoordinates(coordinatesIndex: number) {
    const currentCoordinates = this.dataSource.forest.location.coordinates[0][coordinatesIndex];
    this.dataSource.forest.location.coordinates[0] = this.dataSource.forest.location.coordinates[0].filter(coord => coord !== currentCoordinates);
    this.alertService.success('The points: ' + currentCoordinates[0] + ' and ' + currentCoordinates[1] + ' was removed from list!', true);
  }

  public editCoordinates(latitude, longitude, index) {
    this.dataSource.forest.location.coordinates[0][index][0] = latitude;
    this.dataSource.forest.location.coordinates[0][index][1] = longitude;
    this.alertService.success('The coordinates was modified!');
  }

  public newCoordinates(dataObject) {
    this.dataSource.forest.location.coordinates[0].push(dataObject.coordinates);
    const coordinates = this.dataSource.forest.location.coordinates[0];
    this.dataSource.forest.location.coordinates[0] = []

    coordinates.forEach(points => {
      this.dataSource.forest.location.coordinates[0].push(points);
    });

    this.alertService.success('The points: ' + dataObject.coordinates[0] + ' and ' + dataObject.coordinates[1] + ' was created with success!', true);
  }

  public openNewCoordinatesDialog(objectID) {
    const dialogRef = this.dialog.open(NewCoordinatesDialogComponent, {
      width: '250px',
      data: objectID,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response.event === 'Submit') {
        this.newCoordinates(response);
      }
    });
  }

  public openEditCoordinatesDialog(coordinates, coordinatesIndex) {
    const dialogRef = this.dialog.open(EditCoordinatesDialogComponent, {
      width: '250px',
      data: {
        coordinates: coordinates
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response.event === 'Submit') {
        this.editCoordinates(response.latitude, response.longitude, coordinatesIndex);
      }
    })
  }

  public openRemoveFieldDialog(coordinatesID) {
    const dialogRef = this.dialog.open(RemoveFieldDialogComponent, {
      width: '250px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Submit') {
        this.removeCoordinates(coordinatesID);
      }
    })
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: []
})

export class AngularMaterialModule { }

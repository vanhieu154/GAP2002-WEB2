import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: '[app-lack-information]',
  templateUrl: './lack-information.component.html',
  styleUrls: ['./lack-information.component.css']
})
export class LackInformationComponent {
  constructor(public dialogRef: MatDialogRef<LackInformationComponent>) {}
}

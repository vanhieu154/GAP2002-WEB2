import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-lack-condition',
  templateUrl: './lack-condition.component.html',
  styleUrls: ['./lack-condition.component.css']
})
export class LackConditionComponent {
  constructor(public dialogRef: MatDialogRef<LackConditionComponent>) {}
}

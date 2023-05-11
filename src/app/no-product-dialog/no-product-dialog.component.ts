import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-no-product-dialog',
  templateUrl: './no-product-dialog.component.html',
  styleUrls: ['./no-product-dialog.component.css']
})
export class NoProductDialogComponent {
  constructor(public dialogRef: MatDialogRef<NoProductDialogComponent>) {}

}

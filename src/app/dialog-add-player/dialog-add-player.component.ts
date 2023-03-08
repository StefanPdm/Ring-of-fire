import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss'],
})
export class DialogAddPlayerComponent {
  newPlayerName: string = '';

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

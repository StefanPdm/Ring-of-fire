import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss'],
})
export class EditPlayerComponent {
  public allProfilePictures = [
    'assets/img/profile/1.png',
    'assets/img/profile/2.png',
    'assets/img/profile/3.png',
    'assets/img/profile/4.png',
    'assets/img/profile/5.png',
    'assets/img/profile/6.png',
  ];

  editedName: string;
  selectNewPlayerImg() {}

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditPlayerComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {
  pickCardAnimation = false;
  game: Game | any;
  currentCard: string = '';
  newPlayerName: string = '';

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log('The dialog was closed', result);
      console.log('dialogRef', dialogRef);
      this.game.players.push(result);
    });
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log(this.currentCard);
      console.log(this.game);
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
      }, 1000);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1100);
    }
  }
}

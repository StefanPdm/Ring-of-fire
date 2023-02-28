import { Component, OnChanges, OnInit } from '@angular/core';
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
export class GameComponent implements OnInit, OnChanges {
  pickCardAnimation = false;
  enoughPlayers: Boolean = false;
  game: Game | any;
  currentCard: string = '';
  newPlayerName: string = '';
  playerDistances: number = 85;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);
      }
    });
  }

  ngOnInit(): void {
    this.newGame();
    console.log(window.innerWidth);
    if (window.innerWidth <= 520) {
      this.playerDistances = 50;
    }
  }

  ngOnChanges(): void {
    if (window.innerWidth <= 520) {
      this.playerDistances = 50;
    } else {
      this.playerDistances = 85;
    }
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 1) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
      }, 1000);
      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1100);
    } else {
      console.log('You can only have one card at a time.');
    }
  }
}

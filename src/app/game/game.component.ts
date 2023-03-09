import { Component, OnChanges, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnChanges {
  enoughPlayers: Boolean = false;
  public game: Game | any;

  newPlayerName: string = '';
  playerDistances: number = 85;
  gameID: string;
  gameOver: boolean = false;
  randomIndex: number = 1;

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // public allProfilePictures: string[];
  // editedName: string;
  // selectNewPlayerImg(): void {
  //   throw new Error('Method not implemented.');
  // }
  // onNoClick(): void {
  //   throw new Error('Method not implemented.');
  // }

  openDialog(): void {
    if (this.game.players.length >= 7) {
      return;
    }
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result && result.length > 0) {
        this.game.players.push(result);

        this.game.playerImages.push(
          `assets/img/profile/${this.randomIndex}.png`
        );
        this.saveGame();
        if (this.randomIndex < 6) {
          this.randomIndex++;
        } else {
          this.randomIndex = 1;
        }
      }
    });
  }

  ngOnInit(): void {
    this.newGame();
    if (window.innerWidth <= 520) {
      this.playerDistances = 50;
    }

    this.route.params.subscribe((params) => {
      // console.log('params:', params['id']);
      // console.log('params2:', this.route.params);
      this.gameID = params['id'];
      this.firestore
        .collection('games')
        .doc(params['id'])
        .valueChanges()
        .subscribe((games: Game) => {
          // console.log('actual game:', games);
          this.game.players = games.players;
          this.game.playerImages = games.playerImages;
          this.game.stack = games.stack;
          this.game.playedCards = games.playedCards;
          this.game.currentPlayer = games.currentPlayer;
          this.game.pickCardAnimation = games.pickCardAnimation;
          this.game.currentCard = games.currentCard;
        });
    });
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
    if (this.game.stack.length === 0) {
      console.log('Game over');

      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.saveGame();
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
      }, 1000);
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1100);
    }
  }

  saveGame() {
    this.firestore
      .collection('games')
      .doc(this.gameID)
      .update(this.game.toJson());
  }

  editPlayer(playerIndex: number) {
    console.log('PlayerIndex:', playerIndex);
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        console.log('Change', result);
        console.log('Change', result);
        if (result === 'DELETE') {
          this.game.players.splice(playerIndex, 1);
        } else {
          this.game.playerImages[playerIndex] = result;
        }

        this.saveGame();
      }
    });
  }

  startScreen() {
    this.router.navigateByUrl('');
  }
}

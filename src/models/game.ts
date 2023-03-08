export class Game {
  public players: string[] = ['Bob', 'Alice'];
  public playerImages: string[] = [
    'assets/img/profile/1.png',
    'assets/img/profile/2.png',
  ];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = -1;
  public pickCardAnimation = false;
  public currentCard: string = '';

  constructor() {
    // i < 14
    for (let i = 1; i < 2; i++) {
      this.stack.push(`clubs_${i}`);
      this.stack.push(`diamonds_${i}`);
      this.stack.push(`hearts_${i}`);
      this.stack.push(`spade_${i}`);
    }
    shuffle(this.stack);
  }

  public toJson(): object {
    return {
      players: this.players,
      playerImages: this.playerImages,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
      pickCardAnimation: this.pickCardAnimation,
      currentCard: this.currentCard,
    };
  }
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

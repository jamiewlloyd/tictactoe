const gameBoard = (function () {
   const rows = 3;
   const columns = 3;
   const cells = rows * columns;
   const board = [];

   for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
         board[i].push("")
      }
   }

   const placeToken = function (token, row, column) {
      if (board[row][column] !== 'O' && board[row][column] !== 'X') {
         board[row][column] = token;
         return 'placed'
      } else {
         console.log('Cant place that there')
         return 'fail'
      }
   }

   const getBoard = () => board;

   return {
      getBoard,
      placeToken
   };
})();

// Show board in console
console.log(gameBoard.getBoard());

// Factory to make players
function createPlayer(playerNumber) {
   let playerName = 'Player 1'
   let token = '';
   let score = 0

   if (playerNumber === 1) {
      token = 'O';
   } else if (playerNumber === 2) {
      token = 'X';
   }

   const getToken = () => token;
   const getScore = () => score;
   const increaseScore = () => score++;

   return { playerName, getToken, getScore, increaseScore };
}

// Build Players
const player1 = createPlayer(1);
const player2 = createPlayer(2);

//Game Logic
const game = (function () {
   let currentPlayer = player1;

   function play(row, column) {
      const playerToken = currentPlayer.getToken();
      let result = gameBoard.placeToken(playerToken, row, column);

      if (result === 'placed') {
         if (currentPlayer === player1) {
            currentPlayer = player2;
         } else {
            currentPlayer = player1;
         }
      }
   }
   return { play }
})()

game.play(2, 0);
game.play(2, 1);
game.play(2, 2);
game.play(1, 0);
const gameBoard = (function () {
   const rows = 3;
   const columns = 3;
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
      let board = gameBoard.getBoard()
      let gameState = 'playing';
      let winningToken = ''
      const playerToken = currentPlayer.getToken();
      let result = gameBoard.placeToken(playerToken, row, column);

      if (result === 'placed') {
         if (currentPlayer === player1) {
            currentPlayer = player2;
         } else {
            currentPlayer = player1;
         }
      }

      // from bottom left corner
      if (board[2][0] === "O" || board[2][0] === "X") {
         if ((board[2][0] === board[2][1] && board[2][0] === board[2][2]) ||
            (board[2][0] === board[1][1] && board[2][0] === board[0][2]) ||
            (board[2][0] === board[1][0] && board[2][0] === board[0][0])) {
            gameState = 'winner';
            winningToken = board[2][0];
         }
      }
      // from bottom right corner
      if (board[2][2] === "O" || board[2][2] === "X") {
         if ((board[2][2] === board[1][1] && board[2][2] === board[0][0]) ||
            (board[2][2] === board[1][2] && board[2][2] === board[0][2])) {
            gameState = 'winner';
            winningToken = board[2][2];
         }
      }
      // middle vertical
      if (board[2][1] === "O" || board[2][1] === "X") {
         if (board[2][1] === board[1][1] && board[2][1] === board[0][1]) {
            gameState = 'winner';
            winningToken = board[2][1];
         }
      }
      // middle horizontal
      if (board[1][0] === "O" || board[1][0] === "X") {
         if (board[1][0] === board[1][1] && board[1][0] === board[1][2]) {
            gameState = 'winner';
            winningToken = board[1][0];
         }
      }
      // Top line
      if (board[0][0] === "O" || board[0][0] === "X") {
         if (board[0][0] === board[0][1] && board[0][0] === board[0][2]) {
            gameState = 'winner';
            winningToken = board[0][0];
         }
      }
      if (gameState === 'winner') {
         console.log(`the winner is ${winningToken}`);
      }
   }

   return { play }
})()

game.play(2, 0);
game.play(2, 2);
game.play(2, 1);
game.play(1, 2);
game.play(1, 1);
game.play(0, 2);

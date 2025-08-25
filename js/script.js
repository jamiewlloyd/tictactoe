//get DOM cells
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
         let tokenColor = ``

         if (token === 'X') {
            tokenColor = 'green';
         } else {
            tokenColor = 'red';
         }

         // Get board cells in DOM
         const a0 = document.querySelector("#a0");
         const a1 = document.querySelector("#a1");
         const a2 = document.querySelector("#a2");
         const b0 = document.querySelector("#b0");
         const b1 = document.querySelector("#b1");
         const b2 = document.querySelector("#b2");
         const c0 = document.querySelector("#c0");
         const c1 = document.querySelector("#c1");
         const c2 = document.querySelector("#c2");

         //Insert token to dom and add color
         switch (`${row}${column}`) {
            case `20`:
               a0.textContent = token;
               a0.classList.add(tokenColor);
               break;
            case `21`:
               a1.textContent = token;
               a1.classList.add(tokenColor);
               break;
            case `22`:
               a2.textContent = token;
               a2.classList.add(tokenColor);
               break;
            case `10`:
               b0.textContent = token;
               b0.classList.add(tokenColor);
               break;
            case `11`:
               b1.textContent = token;
               b1.classList.add(tokenColor);
               break;
            case `12`:
               b2.textContent = token;
               b2.classList.add(tokenColor);
               break;
            case `00`:
               c0.textContent = token;
               c0.classList.add(tokenColor);
               break;
            case `01`:
               c1.textContent = token;
               c1.classList.add(tokenColor);
               break;
            case `02`:
               c2.textContent = token;
               c2.classList.add(tokenColor);
               break;
         }
         return 'placed'
      } else {
         return 'fail'
      }
   }

   const getBoard = () => board;

   return {
      getBoard,
      placeToken
   };
})();

// Factory to make players
function createPlayer(playerNumber) {
   let playerName = `Player ${playerNumber}`
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
   let board = gameBoard.getBoard();
   const boardDisplay = document.getElementById("game-container");
   const resultModal = document.getElementById("result-modal");
   const resultText = document.getElementById("result-text");
   const displayName = document.getElementById("player-name");

   displayName.innerText = currentPlayer.playerName;
   displayName.classList.add("red");


   function play(row, column) {
      let gameState = 'playing';
      let winningToken = ''
      const playerToken = currentPlayer.getToken();
      let result = gameBoard.placeToken(playerToken, row, column);

      if (result === 'placed') {
         if (currentPlayer === player1) {
            currentPlayer = player2;
            displayName.innerText = currentPlayer.playerName;
            displayName.classList.toggle("green");
            displayName.classList.toggle("red");
         } else {
            currentPlayer = player1;
            displayName.innerText = currentPlayer.playerName;
            displayName.classList.toggle("green");
            displayName.classList.toggle("red");
         }
      }

      //Check for Win
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

      // Check for draw
      if ((!board[0].includes("") && !board[1].includes("") && !board[2].includes("")) && (gameState === 'playing')) {
         gameState = "draw";
      }

      // Display game result
      if (gameState === "winner") {
         if (winningToken === player1.getToken()) {
            resultText.textContent = `${player1.playerName} is the winner!!`
         } else if (winningToken === player2.getToken()) {
            resultText.textContent = `${player2.playerName} is the winner!!`
         }
         resultModal.showModal();
      } else if (gameState === "draw") {
         resultText.textContent = `It is a draw. Better luck next time.`;
         resultModal.showModal();
      }

   }

   // Reset game after result
   function resetGame() {
      for (let i = 0; i < board.length; i++) {
         // Loop through each element of the inner array
         for (let j = 0; j < board[i].length; j++) {
            // Change the value to an empty string
            board[i][j] = "";
         }
      }

      for (const childNode of boardDisplay.childNodes) {
         // Check if the node is an Element node before trying to change its content
         if (childNode.nodeType === Node.ELEMENT_NODE) {
            childNode.textContent = "";
            if (childNode.classList.contains("green")) {
               childNode.classList.remove("green");
            }
            if (childNode.classList.contains("red")) {
               childNode.classList.remove("red");
            }
         }
      }

      currentPlayer = player1;
      displayName.innerText = currentPlayer.playerName;
      if (displayName.classList.contains("green")) {
         displayName.classList.remove("green");
      }
      if (!displayName.classList.contains("red")) {
         displayName.classList.add("red");
      }
      resultModal.close();
   }

   return { play, resetGame }
})()

document.querySelectorAll(".game-tile").forEach(tile => {
   tile.addEventListener("click", (e) => {
      let cell = e.target.getAttribute("id");
      switch (cell) {
         case `a0`:
            game.play(2, 0);
            break;
         case `a1`:
            game.play(2, 1);
            break;
         case `a2`:
            game.play(2, 2);
            break;
         case `b0`:
            game.play(1, 0);
            break;
         case `b1`:
            game.play(1, 1);
            break;
         case `b2`:
            game.play(1, 2);
            break;
         case `c0`:
            game.play(0, 0);
            break;
         case `c1`:
            game.play(0, 1);
            break;
         case `c2`:
            game.play(0, 2);
            break;
      }
   });
});

const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", game.resetGame);
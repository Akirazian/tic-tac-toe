import gameBoard from "./gameBoard";

const game = (() => {

  // const start = () => {

  //   if (AI === false) {
  //     const playerOneInput = document.getElementById("player-1-input");
  //     const playerTwoInput = document.getElementById("player-2-input");

  //     if (playerOneInput.value === "" || playerTwoInput.value === "") return;    

  //     xPlayer = Player(playerOneInput.value);
  //     oPlayer = Player(playerTwoInput.value);
  //   }

  //   if (AI === true) {
  //     xPlayer = Player("Human");
  //     oPlayer = Player("Computer");
  //     AIChoiceContainer.classList.add("invisible");
  //   }

  //   playerInput.classList.add("invisible");
  //   startButton.classList.add("invisible");
  //   resultDisplay.classList.remove("invisible");
  //   scoreDisplay.classList.remove("invisible");
  //   resultDisplay.innerText = `${xPlayer.name}'s turn`
  //   playerOneScore.innerText = `${xPlayer.name}: ${xPlayer.getScore()}`
  //   playerTwoScore.innerText = `${oPlayer.name}: ${oPlayer.getScore()}`
  //   boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
  // };

  // const restart = () => {
  //   gameBoard.clear();
  //   resultDisplay.innerText = "";
  //   restartButton.classList.add("invisible");
  //   boxes.forEach(box => box.addEventListener("click", gameBoard.mark))
  //   winner = false;
  //   currentPlayer = "X";
  //   resultDisplay.innerText = `${xPlayer.name}'s turn`
  // };

  // const getCurrentPlayer = () => {
  //   return currentPlayer;
  // };

  // const playTurn = () => {
  //   let board = gameBoard.getBoard();
  //   let result = checkGame(board);
  //   if (result != null) {
  //     _callWinner(result);
  //     return;
  //   }

  //   if (currentPlayer === "X") {
  //     if (AI === true) { //Play the AI's turn immediately
  //       currentPlayer = "O";
  //       resultDisplay.innerText = `${oPlayer.name}'s turn`;
  //       boxes.forEach(box => box.removeEventListener("click", gameBoard.mark));
  //       setTimeout(gameBoard.AImark, 800);
  //       setTimeout(() => {
  //         result = checkGame(board);
  //         if (result != null) {
  //           _callWinner();
  //           return
  //         };
  //         currentPlayer = "X";
  //         resultDisplay.innerText = `${xPlayer.name}'s turn`;
  //         boxes.forEach((box) => box.addEventListener("click", gameBoard.mark));
  //       }, 820);

  //     } else {
  //     currentPlayer = "O";
  //     resultDisplay.innerText = `${oPlayer.name}'s turn`
  //     }
  //   } else {
  //     currentPlayer = "X"
  //     resultDisplay.innerText = `${xPlayer.name}'s turn`
  //   }
  // };

  let currentPlayer = "X";

  const playTurn = () => {
    let board = gameBoard.getBoard();
    let result = _checkGame(board);
    if (result != null) {
      _endGame(result);
      return;
    }
    currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
  }

  const getCurrentPlayer = () => { return currentPlayer; }

  const _checkGame = () => {
    let board = gameBoard.getBoard();

    for (let i = 0; i <= 6; i += 3) { //rows
      let row = board.slice(i, (i+3));
      if (row.every(box => box === row[0] && box != "")) {
        return row[0];
      }
    }

    for (let i = 0; i <= 2; i++) { //columns
      let column = [board[i], board[i+3], board[i+6]];
      if (column.every(box => box === column[0] && box != "")) {
        return column[0];
      }
    }

    let diagnol1 = [board[0], board[4], board[8]];
    if (diagnol1.every(box => box === diagnol1[0] && box != "")) {
      return diagnol1[0];
    }

    let diagnol2 = [board[2], board[4], board[6]];
    if (diagnol2.every(box => box === diagnol2[0] && box != "")) {
      return diagnol2[0];
    }
    
    if (board.every((value => value != ""))) {
      return "tie";
  }

    return null;
  };

  const _endGame = (result) => {
    console.log(result);
  };

  return {
    playTurn, 
    getCurrentPlayer
  }
})();

export default game;
Array.prototype.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

const gameBoard = (() => { //game board module

  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]

  const mark = (event) => {
    if (event.target.innerText != "") return;
    game.playTurn(event);
    display();
  }

  const clear = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    display();
  }

  const display = () => {
    for (i = 0; i < board.length; i++) {
      let box = document.getElementById(i);
      box.innerText = board[i];
    }
  }

  return {
    board,
    mark,
    clear
  }
})();

const Player = (sign) => { //Player factory

};


const game = (() => { //game logic module

  let currentPlayer = "X";
  const resultDisplay = document.querySelector(".results");

  const playTurn = (event) => {
    gameBoard.board[event.target.id] = currentPlayer;
    checkGame();
    if (currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X"
  }
 
  const checkGame = () => {

    for (let i = 0; i <= 6; i += 3) { //rows
      let row = gameBoard.board.slice(i, (i+3));
      if (row.every(box => box == row[0] && box != "")) {
        callWinner();
      }
    }

    for (let i = 0; i <= 2; i++) { //columns
      let column = [gameBoard.board[i], gameBoard.board[i+3], gameBoard.board[i+6]];
      if (column.every(box => box == column[0] && box != "")) {
        callWinner();
      }
    }

    let diagnol1 = [gameBoard.board[0], gameBoard.board[4], gameBoard.board[8]];
    if (diagnol1.every(box => box == diagnol1[0] && box != "")) {
      callWinner();
    }

    let diagnol2 = [gameBoard.board[2], gameBoard.board[4], gameBoard.board[6]];
    if (diagnol2.every(box => box == diagnol2[0] && box != "")) {
      callWinner();
    }
    
    if (gameBoard.board.every((value => value != ""))) {
       resultDisplay.innerText = "It's a draw!";
    }
  } 

  const callWinner = () => {
    resultDisplay.innerText = `${currentPlayer} wins!`

  }

  return {
    playTurn,
  }
  

})();

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
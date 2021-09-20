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

  const playTurn = (event) => {
    gameBoard.board[event.target.id] = currentPlayer;
    checkGame();
    if (currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X"
  }
 
  const checkGame = () => {
    const resultDisplay = document.querySelector(".results");

    for ( let i = 0; i <= 6; i += 3) { //rows
      let row = gameBoard.board.slice(i, (i+3));
      if (row.every(box => box == row[0] && box != "")) {
        resultDisplay.innerText = `${currentPlayer} wins!`
      }
    }

    for ( let i = 0; i <= 6; i += 3) { //rows
      let row = gameBoard.board.slice(i, (i+3));
      if (row.every(box => box == row[0] && box != "")) {
        resultDisplay.innerText = `${currentPlayer} wins!`
      }
    }
    
    if (gameBoard.board.every((value => value != ""))) {
       resultDisplay.innerText = "It's a draw!";
    }
  }

  return {
    playTurn,
  }
  

})();

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
const gameBoard = (() => { //game board module

  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]

  const mark = (event) => {
    if (event.target.innerText != "") return;
    game.nextTurn(event);
    game.checkGame();
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
    display,
    clear
  }
})();

const Player = (sign) => { //Player factory

};


const game = (() => { //game logic module

  let currentPlayer = "X";

  const nextTurn = (event) => {
    gameBoard.board[event.target.id] = currentPlayer;
    if (currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X"
  }
 
  const checkGame = () => {
    if (gameBoard.board.every((value => value != ""))) {
       results.innerText = "It's a draw!";
    }
  }

  return {
    nextTurn,
    checkGame
  }
  

})();

const results = document.querySelector(".results");
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]

const gameBoard = (() => { //game board module

  const mark = (event) => {
    if (event.target.innerText != "") return;
    game.playTurn(event);
    _display();
  }

  const clear = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    _display();
  }

  const _display = () => {
    for (let i = 0; i < board.length; i++) {
      let box = document.getElementById(i);
      box.innerText = board[i];
    }
  }

  return {
    mark,
    clear
  }
})();

const Player = (sign) => { //Player factory

};

const game = (() => { //game logic module

  let currentPlayer = "X";
  const resultDisplay = document.querySelector(".results");
  const boxes = document.querySelectorAll(".box");

  const start = () => {
    if (board.some((value => value != ""))) {
      gameBoard.clear();
      resultDisplay.innerText = "";
    }
    boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
    startButton.classList.add("invisible");
    restartButton.classList.add("invisible");
  }

  const playTurn = (event) => {
    board[event.target.id] = currentPlayer;
    _checkGame();
    if (currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X"
  }
 
  const _checkGame = () => {

    for (let i = 0; i <= 6; i += 3) { //rows
      let row = board.slice(i, (i+3));
      if (row.every(box => box == row[0] && box != "")) {
        _callWinner();
      }
    }

    for (let i = 0; i <= 2; i++) { //columns
      let column = [board[i], board[i+3], board[i+6]];
      if (column.every(box => box == column[0] && box != "")) {
        _callWinner();
      }
    }

    let diagnol1 = [board[0], board[4], board[8]];
    if (diagnol1.every(box => box == diagnol1[0] && box != "")) {
      _callWinner();
    }

    let diagnol2 = [board[2], board[4], board[6]];
    if (diagnol2.every(box => box == diagnol2[0] && box != "")) {
      _callWinner();

    }
    
    if (board.every((value => value != ""))) {
       resultDisplay.innerText = "It's a draw!";
    }
  } 

  const _callWinner = () => {
    resultDisplay.innerText = `${currentPlayer} wins!`
    boxes.forEach(box => box.removeEventListener("click", gameBoard.mark))
    restartButton.classList.remove("invisible");
  }

  return {
    start,
    playTurn,
  }
})();

const boxes = document.querySelectorAll(".box");
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", game.start);
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", game.start);

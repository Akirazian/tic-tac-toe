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

const Player = (name) => { //Player factory
  let score = 0;

  const win = () => {
    score++;
  }

  const getScore = () => {
    return score;
  }
  
  return { name, getScore, win };
};

// const display

const game = (() => { //game logic module

  const resultDisplay = document.querySelector(".results");
  const boxes = document.querySelectorAll(".box");
  const playerInput = document.getElementById("player-input")
  const playerOneInput = document.getElementById("player-1-input");
  const playerTwoInput = document.getElementById("player-2-input");
  
  let currentPlayer = "X";
  let xPlayer = ""
  let oPlayer = ""
  let winner = false;

  const start = () => {
    if (playerOneInput.value === "" || playerTwoInput.value === "") return;    

    xPlayer = Player(playerOneInput.value);
    oPlayer = Player(playerTwoInput.value);

    playerInput.classList.add("invisible");
    startButton.classList.add("invisible");
    resultDisplay.classList.remove("invisible");
    resultDisplay.innerText = `${xPlayer.name}'s turn`
    boxes.forEach((box) => box.addEventListener("click", gameBoard.mark))
  }

  const restart = () => {
    gameBoard.clear();
    resultDisplay.innerText = "";
    restartButton.classList.add("invisible");
    boxes.forEach(box => box.addEventListener("click", gameBoard.mark))
    winner = false;
    currentPlayer = "X";
    resultDisplay.innerText = `${xPlayer.name}'s turn`
  }

  const playTurn = (event) => {
    board[event.target.id] = currentPlayer;
    _checkGame();
    if (winner === true) return;
    if (currentPlayer === "X") {
      currentPlayer = "O";
      resultDisplay.innerText = `${oPlayer.name}'s turn`
    }
    else {
      currentPlayer = "X"
      resultDisplay.innerText = `${xPlayer.name}'s turn`
    }
  }
 
  const _checkGame = () => {

    for (let i = 0; i <= 6; i += 3) { //rows
      let row = board.slice(i, (i+3));
      if (row.every(box => box === row[0] && box != "")) {
        _callWinner();
      }
    }

    for (let i = 0; i <= 2; i++) { //columns
      let column = [board[i], board[i+3], board[i+6]];
      if (column.every(box => box === column[0] && box != "")) {
        _callWinner();
      }
    }

    let diagnol1 = [board[0], board[4], board[8]];
    if (diagnol1.every(box => box === diagnol1[0] && box != "")) {
      _callWinner();
    }

    let diagnol2 = [board[2], board[4], board[6]];
    if (diagnol2.every(box => box === diagnol2[0] && box != "")) {
      _callWinner();
    }
    
    if (board.every((value => value != "")) && winner === false) {
       resultDisplay.innerText = "It's a draw!";
       restartButton.classList.remove("invisible");
       winner = true;
    }
  } 

  const _callWinner = () => {
    winner = true;
    currentPlayer === "X" ? xPlayer.win() : oPlayer.win();
    if (currentPlayer === "X") {
      resultDisplay.innerText = `${xPlayer.name} wins! Score is now ${xPlayer.getScore()} to ${oPlayer.getScore()}` 
    } else {
      resultDisplay.innerText = `${oPlayer.name} wins! Score is now ${xPlayer.getScore()} to ${oPlayer.getScore()}`
    }
    boxes.forEach(box => box.removeEventListener("click", gameBoard.mark))
    restartButton.classList.remove("invisible");
  }

  return {
    start,
    restart,
    playTurn,
  }
})();

const boxes = document.querySelectorAll(".box");
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", game.start);
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", game.restart);

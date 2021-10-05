const gameBoard = (() => { //game board module

  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]
 
  const mark = (event) => {
    let position = event.target.id;
    if (board[position] != "") return;
    board[position] = game.getCurrentPlayer();
    game.playTurn();
    _display();
  }

  const AImark = () => {
    let position = AI.play();
    board[position] = "O";
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

  const getBoard = () => {
    return board;
  }

  return {
    getBoard,
    mark,
    AImark,
    clear
  }
})();

const Player = (name) => { //Player factory
  let score = 0;

  const win = () => score++;

  const getScore = () => {
    return score;
  }
  
  return { name, getScore, win };
};

const game = (() => { //game logic module

  const boxes = document.querySelectorAll(".box");
  const resultDisplay = document.querySelector(".results");
  const scoreDisplay = document.querySelector(".score-container");
  const playerOneScore = document.getElementById("player-1-score");
  const playerTwoScore = document.getElementById("player-2-score");
  const playerInput = document.getElementById("player-input")

  let currentPlayer = "X";
  let xPlayer = ""
  let oPlayer = ""
  let winner = false;
  let AI = false;

  const choosePlayer = (event) => {
    const playerChoiceContainer = document.getElementById("player-choice-container");
    playerChoiceContainer.classList.add("invisible");

    if (event.target.id === "player-button") {
      AI = false;
      playerInput.classList.remove("invisible");
      startButton.classList.remove("invisible");
    }

    if (event.target.id === "ai-button") {
      AI = true;
      start();
    }
  }

  const start = () => {

    if (AI === false) {
      const playerOneInput = document.getElementById("player-1-input");
      const playerTwoInput = document.getElementById("player-2-input");

      if (playerOneInput.value === "" || playerTwoInput.value === "") return;    

      xPlayer = Player(playerOneInput.value);
      oPlayer = Player(playerTwoInput.value);
    }

    if (AI === true) {
      xPlayer = Player("Human");
      oPlayer = Player("Computer");
    }

    playerInput.classList.add("invisible");
    startButton.classList.add("invisible");
    resultDisplay.classList.remove("invisible");
    scoreDisplay.classList.remove("invisible");
    resultDisplay.innerText = `${xPlayer.name}'s turn`
    playerOneScore.innerText = `${xPlayer.name}: ${xPlayer.getScore()}`
    playerTwoScore.innerText = `${oPlayer.name}: ${oPlayer.getScore()}`
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

  const getCurrentPlayer = () => {
    return currentPlayer;
  }

  const playTurn = () => {
    _checkGame();
    if (winner === true) return;
    if (currentPlayer === "X") {

      if (AI === true) { //Play the AI's turn immediately
        currentPlayer = "O";
        resultDisplay.innerText = `${oPlayer.name}'s turn`;
        setTimeout(gameBoard.AImark, 800);
        setTimeout(_checkGame, 850);
        if (winner === true) return;
        setTimeout(() => {
        currentPlayer = "X";
        resultDisplay.innerText = `${xPlayer.name}'s turn`;
        }, 850);

      } else {
      currentPlayer = "O";
      resultDisplay.innerText = `${oPlayer.name}'s turn`
      }
    }
    else {
      currentPlayer = "X"
      resultDisplay.innerText = `${xPlayer.name}'s turn`
    }
  }
 
  const _checkGame = () => {
    let board = gameBoard.getBoard();

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
    if (currentPlayer === "X") {
      xPlayer.win()
      resultDisplay.innerText = `${xPlayer.name} wins!` 
    } else {
      oPlayer.win();
      resultDisplay.innerText = `${oPlayer.name} wins!`
    }
    playerOneScore.innerText = `${xPlayer.name}: ${xPlayer.getScore()}`
    playerTwoScore.innerText = `${oPlayer.name}: ${oPlayer.getScore()}`
    boxes.forEach(box => box.removeEventListener("click", gameBoard.mark))
    restartButton.classList.remove("invisible");
  }

  return {
    choosePlayer,
    start,
    restart,
    playTurn,
    getCurrentPlayer
  }
})();

const AI = (() => {

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const play = () => {
    let playableIndex = [];
    let board = gameBoard.getBoard();
    let index = board.indexOf("");
    while (index != -1) {
      playableIndex.push(index);
      index = board.indexOf("", index + 1);
    }
    let position = getRandomInt(0, playableIndex.length);
    let markPosition = playableIndex[position];
    return markPosition;
  }

  return {
    play
  }

})();

const choosePlayerButtons = document.querySelectorAll(".player-choice");
choosePlayerButtons.forEach(button => {
  button.addEventListener("click", game.choosePlayer);
})

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", game.start);
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", game.restart);

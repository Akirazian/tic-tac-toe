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
    let position = AI.bestPlay();
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
    let board = gameBoard.getBoard();
    let result = checkGame(board);
    if (result != null) {
      _callWinner();
      return;
    };
    if (currentPlayer === "X") {
      if (AI === true) { //Play the AI's turn immediately
        currentPlayer = "O";
        resultDisplay.innerText = `${oPlayer.name}'s turn`;
        boxes.forEach(box => box.removeEventListener("click", gameBoard.mark));
        setTimeout(gameBoard.AImark, 800);
        setTimeout(() => {
          result = checkGame(board);
          if (result != null) {
            _callWinner();
            return
          };
          currentPlayer = "X";
          resultDisplay.innerText = `${xPlayer.name}'s turn`;
          boxes.forEach((box) => box.addEventListener("click", gameBoard.mark));
        }, 820);

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
 
  const checkGame = (board) => {
    for (let i = 0; i <= 6; i += 3) { //rows
      let row = board.slice(i, (i+3));
      if (row.every(box => box === row[0] && box != "")) {
        return currentPlayer;
      }
    }

    for (let i = 0; i <= 2; i++) { //columns
      let column = [board[i], board[i+3], board[i+6]];
      if (column.every(box => box === column[0] && box != "")) {
        return currentPlayer;
      }
    }

    let diagnol1 = [board[0], board[4], board[8]];
    if (diagnol1.every(box => box === diagnol1[0] && box != "")) {
      return currentPlayer;
    }

    let diagnol2 = [board[2], board[4], board[6]];
    if (diagnol2.every(box => box === diagnol2[0] && box != "")) {
      return currentPlayer;
    }
    
    if (board.every((value => value != "")) && board.some((value => value === ""))) {
       resultDisplay.innerText = "It's a draw!";
       restartButton.classList.remove("invisible");
       return "tie";
    }

    return null;
  } 

  const _callWinner = () => {
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
    checkGame,
    getCurrentPlayer
  }
})();

const AI = (() => {

  const _getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const randomPlay = () => {
    let playableIndex = [];
    let board = gameBoard.getBoard();
    let index = board.indexOf("");
    while (index != -1) {
      playableIndex.push(index);
      index = board.indexOf("", index + 1);
    }
    let position = _getRandomInt(0, playableIndex.length);
    let markPosition = playableIndex[position];
    return markPosition;
  }

  const bestPlay = () => {
    let board = gameBoard.getBoard();
    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = _minimax(board, 0, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  let scores = {
    O: 1,
    X: -1,
    tie: 0
  };

  const _minimax = (board, depth, isMaximizing) => {
    let result = game.checkGame(board);
    if (result != null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = _minimax(board, depth + 1, false)
          board[i] = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = _minimax(board, depth + 1, true)
          board[i] = "";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };
  

  return {
    randomPlay,
    bestPlay
  }

})();

const choosePlayerButtons = document.querySelectorAll(".player-choice");
choosePlayerButtons.forEach(button => button.addEventListener("click", game.choosePlayer));
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", game.start);
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", game.restart);

import gameBoard from "./gameBoard";
import game from "./gameController";

const display = (() => {

  const boxes = document.querySelectorAll(".box");
  const resultDisplay = document.querySelector(".results");
  const scoreDisplay = document.querySelector(".score-container");
  const playerOneScore = document.getElementById("player-1-score");
  const playerTwoScore = document.getElementById("player-2-score");
  const playerInput = document.getElementById("player-input")
  const AIChoiceContainer = document.getElementById("ai-choice-container");
  
  const board = () => {
    let gameboard = gameBoard.getBoard();
    for (let i = 0; i < gameboard.length; i++) {
      let box = document.getElementById(i);
      box.innerText = gameboard[i];
    }
  };

  const initBoard = () => {
    boxes.forEach(box => box.addEventListener("click", (event) => {
      gameBoard.mark(event.target.id, game.getCurrentPlayer());
    }));

  }

  return {
    board,
    initBoard
  }
})();

export default display;
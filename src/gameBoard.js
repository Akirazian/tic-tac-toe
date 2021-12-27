import display from "./display";
import game from "./gameController";

const gameBoard = (() => { 

  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ];

  const clear = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    display.board();
  };

  const mark = (position, play) => {
    if (board[position] === "") {
    board[position] = play;
    } else {
      console.log("full!");
    }
    display.board();
    game.playTurn();
  }

  const getBoard = () => {
    return board;
  };

  return {
    getBoard,
    clear,
    mark
  }
})();

export default gameBoard;
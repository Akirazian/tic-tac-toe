const gameBoard = ((position) => {
  let board = [
    "", "", "", 
    "", "", "", 
    "", "", ""
  ]

  const clearBoard = () => board = ["", "", "", "", "", "", "", "", ""];

  const display = () => {
    for (i = 0; i < board.length; i++) {
      let box = document.getElementById(i);
      box.innerText = board[i];
    }
  }

  return {
    board,
    display,
    clearBoard
  }
})();

const Player = (sign) => {

  const mark = (event) => {
    if (event.target.innerText != "") return;
    gameBoard.board[event.target.id] = sign;
    gameBoard.display();
  }

  return {
    mark
  }
};

const xPlayer = Player("X");
const oPlayer = Player("O");

const game = (() => {
  let turn = "X";

  const mark = (event) => {
    if (turn === "X") xPlayer.mark(event);
    else oPlayer.mark(event);

    if (turn === "X") turn = "O";
    else turn = "X"
  }

  return {
    mark
  }

})();

const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => box.addEventListener("click", game.mark))
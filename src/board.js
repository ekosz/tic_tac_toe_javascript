(function() {
  window.TTT = window.TTT || {};
  TTT.Board = TTT.Board || {};

  var Board = TTT.Board;

  // API

  Board.isOver = function(board) {
    if( isFull(board) || this.winner(board) ) { return true; }

    return false;
  };

  Board.winner = function(board) {
    return horizontalWinner(board)|| 
           verticalWinner(board) || 
           diagonalWinner(board);
  };

  Board.children = function(board, piece) {
    var children = [];

    board.forEach(function(cell, index) {
      if(!validPiece(cell)) {
        var child = cloneArray(board);
        child[index] = piece;
        children.push(child);
      }
    });

    return children;
  };

  // Private functions

  function isFull(board) {
    return board.every(function(cell, index, board) {
      return validPiece(cell);
    });
  }

  function validPiece(piece) {
    return (!!piece && piece !== ' ');
  }

  function horizontalWinner(board) {
    return (isTheSame(board[0], board[1], board[2]) ||
            isTheSame(board[3], board[4], board[5]) ||
            isTheSame(board[6], board[7], board[8]))
  }

  function isTheSame() {
    var pieces = argumentsToArray(arguments), 
        piece = pieces.pop();

    var isFirstPiece = function(cell) { return validPiece(cell) && cell === piece; };
    if(pieces.every(isFirstPiece)) { return piece; }

    return false;
  }

  function argumentsToArray(arguments) {
    return Array.prototype.slice.call(arguments);
  }

  function verticalWinner(board) {
    return (isTheSame(board[0], board[3], board[6]) ||
            isTheSame(board[1], board[4], board[7]) ||
            isTheSame(board[2], board[5], board[8]))
  }

  function diagonalWinner(board) {
    return (isTheSame(board[0], board[4], board[8]) ||
            isTheSame(board[2], board[4], board[6]))
  }

  function cloneArray(array) {
    return array.slice(0);
  }

})();

(function() {
  window.TTT = window.TTT || {};
  TTT.Minimax = TTT.Minimax || {};

  var Minimax = TTT.Minimax,
      Board   = TTT.Board;

  // API

  Minimax.score = function(board, toWin, currentPiece) {
    if(Board.isOver(board)) { return currentScore(board, toWin); }

    currentPiece = currentPiece || toWin;

    var self = this,
        children = Board.children(board, currentPiece);

    var scores = children.map(function(child) {
      return self.score(child, toWin, nextPiece(currentPiece));
    });

    if(currentPiece === toWin) { return maxArray(scores); }
    return minArray(scores);
  };
  
  // Private functions

  function currentScore(board, toWin) {
    if(Board.winner(board) === toWin) { 
      return 1; 
    } else if(!!Board.winner(board)) { 
      return -1; 
    } else {
      return 0;
    }
  }

  function nextPiece(piece) {
    return piece === 'x' ? 'o' : 'x';
  }

  function minArray(array) {
    return Math.min.apply(null, array);
  }

  function maxArray(array) {
    return Math.max.apply(null, array);
  }

})();

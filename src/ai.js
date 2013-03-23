(function() {
  window.TTT = window.TTT || {};
  TTT.AI     = TTT.AI || {};

  var AI      = TTT.AI;
  var Board   = TTT.Board;
  var Minimax = TTT.Minimax;

  // API

  AI.move = function(board, piece) {
    return Board.children(board, piece).sort(byMinimax(piece))[0];
  };

  // Private functions

  function byMinimax(piece) {
    return function(a,b) {
      var other = nextPiece(piece);

      return Minimax.score(b, piece, other) - Minimax.score(a, piece, other);
    }
  }
  
  function nextPiece(piece) {
    return piece === 'x' ? 'o' : 'x';
  }

})();

(function() {
  window.TTT = window.TTT || {};

  var AI = TTT.AI;
  var Board = TTT.Board;

  // Contructor

  TTT.TTTView = function(rootEl) {
    this.el = rootEl;
    this.cells = this.el.getElementsByClassName('cell');

    this.message = this.el.getElementsByClassName('message')[0];
    this.message.textContent = "Click any cell to start";

    this.boardDisabled = false;

    this.bindEvents = function() {
      var self = this;

      forEach(this.cells, function(cell) {
        cell.addEventListener('click', self.cellClick.bind(self), false);
      });
    };
  };

  // Instance Methods

  var View = TTT.TTTView.prototype;

  View.cellClick = function(event) {
    var cell = event.target;
    if(this.boardDisabled || cell.textContent !== '') return;

    cell.textContent = 'x';

    var board = this.curretBoard();
    if(Board.isOver(board)) {
      this.boardDisabled = true;
      return this.displayWinner(Board.winner(board));
    }

    this.takeAITurn();
  };

  View.curretBoard = function() {
    var map = Array.prototype.map;
    return map.call(this.cells, function(cell) {
      return cell.textContent;
    });
  };

  View.takeAITurn = function() {
    var self = this;

    self.message.textContent = "Thinking...";
    self.boardDisabled = true;

    async(function() {
      var newBoard = AI.move(self.curretBoard(), 'o');
      self.setCurrentBoard(newBoard);

      if(Board.isOver(newBoard)) return self.displayWinner(Board.winner(newBoard));

      self.message.textContent = "Your turn";
      self.boardDisabled = false;
    });
  };

  View.setCurrentBoard = function(board) {
    forEach(this.cells, function(cell, index) {
      cell.textContent = board[index];
    });
  };

  View.displayWinner = function(winner) {
    var msg = winner ? "" + winner + " won!" : "Tie game.";
    this.message.textContent = "Game Over. " + msg;
  };

  // Private functions

  function forEach(list, cb) {
    var each = Array.prototype.forEach;
    each.call(list, cb);
  }

  function async(cb) {
    setTimeout(cb, 0);
  }
})();

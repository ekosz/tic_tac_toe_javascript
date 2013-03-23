(function() {
  window.TTT = window.TTT || {};

  var AI       = TTT.AI;
  var Board    = TTT.Board;
  var CellView = TTT.CellView;

  // Contructor

  TTT.TTTView = function(rootEl) {
    this.el      = rootEl;
    this.cells   = cellViewsFor(this.el);
    this.message = this.el.getElementsByClassName('message')[0];
    this.button  = this.el.getElementsByClassName('playAgain')[0];

    reset(this);

    // Event Handling

    this.bindEvents = function() {
      var self = this;

      forEach(self.cells, function(cell) {
        cell.addEventListener('click', self.cellClick.bind(self));
      });

      self.button.addEventListener('click', self.playAgain.bind(self), false);
    };
  };

  // Instance Methods

  var View = TTT.TTTView.prototype;

  View.cellClick = function(event) {
    var board = this.curretBoard();

    if(Board.isOver(board)) { 
      disableCells(this.cells);
      return this.displayWinner(Board.winner(board)); 
    }

    this.takeAITurn();
  };

  View.playAgain = function(event) {
    reset(this);
  };

  View.curretBoard = function() {
    return map(this.cells, function(cell) {
      return cell.getPiece();
    });
  };

  View.takeAITurn = function() {
    var self = this;

    setMessage(self, "Thinking...");
    disableCells(self.cells);

    async(function() {
      var newBoard = AI.move(self.curretBoard(), 'o');
      self.setCurrentBoard(newBoard);

      if(Board.isOver(newBoard)) return self.displayWinner(Board.winner(newBoard));

      setMessage(self, "Your turn");
      enableCells(self.cells);
    });
  };

  View.setCurrentBoard = function(board) {
    forEach(this.cells, function(cell, index) {
      cell.setPiece(board[index]);
    });
  };

  View.displayWinner = function(winner) {
    var msg = winner ? "" + winner + " won!" : "Tie game.";
    setMessage(this, "Game Over. " + msg);

    showPlayAgainButton(this);
  };

  // Private functions

  function cellViewsFor(element) {
    return map(element.getElementsByClassName('cell'), function(cell) {
      var cellView = new CellView(cell);
      cellView.bindEvents();
      return cellView;
    });
  }

  function reset(view) {
    setMessage(view, "Click any cell to start");

    hidePlayAgainButton(view);

    forEach(view.cells, function(cell) { cell.reset(); });
  }

  function forEach(list, cb) {
    var each = Array.prototype.forEach;
    each.call(list, cb);
  }

  function map(list, cb) {
    var map = Array.prototype.map;
    return map.call(list, cb);
  }

  function async(cb) {
    setTimeout(cb, 0);
  }

  function enableCells(cells) {
    forEach(cells, function(cell) { cell.enable(); });
  }

  function disableCells(cells) {
    forEach(cells, function(cell) { cell.disable(); });
  }

  function setMessage(view, message) {
    view.message.textContent = message;
  }

  function hidePlayAgainButton(view) {
    view.button.style.display = "none";
  }

  function showPlayAgainButton(view) {
    view.button.style.display = "block";
  }
})();

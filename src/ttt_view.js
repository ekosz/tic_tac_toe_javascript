(function() {
  window.TTT = window.TTT || {};

  var AI = TTT.AI;

  // Contructor

  TTT.TTTView = function(rootEl) {
    this.el = rootEl;
    this.cells = this.el.getElementsByClassName('cell');

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
    if(cell.textContent !== '') return;

    cell.textContent = 'x';

    this.takeAITurn();
  };

  View.curretBoard = function() {
    var map = Array.prototype.map;
    return map.call(this.cells, function(cell) {
      return cell.textContent;
    });
  };

  View.takeAITurn = function() {
    this.setCurrentBoard(AI.move(this.curretBoard(), 'o'));
  };

  View.setCurrentBoard = function(board) {
    forEach(this.cells, function(cell, index) {
      cell.textContent = board[index];
    });
  };

  // Private functions

  function forEach(list, cb) {
    var each = Array.prototype.forEach;
    each.call(list, cb);
  }
})();

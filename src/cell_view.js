(function() {
  window.TTT = window.TTT || {};

  // Constructor

  TTT.CellView  = function(element) {
    this.el       = element;
    this.disabled = false;

    // Event Handling

    this._clickFunction = this.click.bind(this);

    this.bindEvents = function() {
      this.el.addEventListener('click', this._clickFunction, false);
    };
  };

  // Instance Methods

  var Cell = TTT.CellView.prototype;

  Cell.click = function(event) {
    if(this.disabled || this.getPiece() !== '') return event.stopPropagation();

    this.setPiece('x');
  };

  Cell.setPiece = function(text) {
    this.el.textContent = text;
  };

  Cell.getPiece = function() {
    return this.el.textContent;
  };

  Cell.disable = function() {
    this.disabled = true;
  };

  Cell.enable = function() {
    this.disabled = false;
  };

  Cell.reset = function() {
    this.setPiece("");
    this.disabled = false;
  };
})();

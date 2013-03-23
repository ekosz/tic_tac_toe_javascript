describe("TTT View", function() {
  var TTTView = TTT.TTTView;

  var view;

  beforeEach(function() {
    var rootElement = {getElementsByClassName: function() {}};
    view = new TTTView(rootElement);
  });

  describe("#cellClick", function() {

    describe("when the cell is empty", function() {
      var cell, event;

      beforeEach(function() {
        cell = {textContent: ''};
        event = {target: cell};
        spyOn(view, 'takeAITurn');
      });

      it("sets the cells text to 'x'", function() {
        view.cellClick(event);

        expect(cell.textContent).toBe('x');
      });

      it("promts the AI to take its turn", function() {
        view.cellClick(event);

        expect(view.takeAITurn).toHaveBeenCalled();
      });
    });

    describe("when the cell is not empty", function() {
      it("does not change the cells text", function() {
        var cell = {textContent: 'o'},
            event = {target: cell};

        view.cellClick(event);

        expect(cell.textContent).toBe('o');
      });
    });
  });

  describe("#curretBoard", function() {
    it("contructs a board array from the current state of the view", function() {
      view.cells = [{textContent: 'x'}, {textContent: ''}, {textContent: 'o'}];

      expect(view.curretBoard()).toEqual(['x', '', 'o']);
    });
  });

  describe("#takeAITurn", function() {
    var board = ['x', 'o', 'x'];

    beforeEach(function() {
      spyOn(TTT.AI, 'move');
      spyOn(view, 'curretBoard').andReturn(board);
      spyOn(view, 'setCurrentBoard');
    });

    it("uses AI with the curret state of the board", function() {
      view.takeAITurn()

      expect(TTT.AI.move).toHaveBeenCalledWith(board, 'o');
    });

    it("sets the current board to the result of the AI", function() {
      TTT.AI.move.andReturn(board);

      view.takeAITurn();

      expect(view.setCurrentBoard).toHaveBeenCalledWith(board);
    });
  });

  describe("#setCurrentBoard", function() {
    it("sets the view's cells to the values in the board array", function() {
      var cell = {textContent: ''};
      view.cells = [cell];

      view.setCurrentBoard(['x']);

      expect(cell.textContent).toBe('x');
    });
  });
});

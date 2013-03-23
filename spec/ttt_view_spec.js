describe("TTT View", function() {
  var TTTView = TTT.TTTView;

  var view;
  var mockCell = function(piece) { 
    return {getPiece: function() { return piece; }}; 
  };

  beforeEach(function() {
    var elementMock = {
      textContent: "", 
      style: {display: ""}, 
      addEventListener: jasmine.createSpy()
    };

    var rootElement = {getElementsByClassName: function() { return [elementMock]; }};
    view            = new TTTView(rootElement);
  });

  describe("#click", function() {
    beforeEach(function() {
      spyOn(view, 'curretBoard');
    });

    describe("when the game is not over", function() {
      it("promts the AI to take its turn", function() {
        spyOn(TTT.Board, 'isOver').andReturn(false);
        spyOn(view,      'takeAITurn');

        view.click();

        expect(view.takeAITurn).toHaveBeenCalled();
      });
    });

    describe("when the game is over", function() {
      var cellViewMock;

      beforeEach(function() {
        spyOn(TTT.Board, 'isOver').andReturn(true);
        spyOn(TTT.Board, 'winner').andReturn('z');
        spyOn(view,      'displayWinner')

        cellViewMock = {disable: jasmine.createSpy()};
        view.cells   = [cellViewMock];
      });

      it("displays the winner", function() {
        view.click();

        expect(view.displayWinner).toHaveBeenCalledWith('z');
      });

      it("disables the cells", function() {
        view.click();

        expect(cellViewMock.disable).toHaveBeenCalled();
      });
    });
  });

  describe("#curretBoard", function() {
    it("contructs a board array from the current state of the view", function() {
      view.cells = [mockCell('x'), mockCell(''), mockCell('o')];

      expect(view.curretBoard()).toEqual(['x', '', 'o']);
    });
  });

  describe("#takeAITurn", function() {
    var board = ['x', 'o', 'x'];

    beforeEach(function() {
      spyOn(TTT.AI, 'move');
      spyOn(view,   'curretBoard').andReturn(board);
      spyOn(view,   'setCurrentBoard');
    });

    it("uses AI with the curret state of the board", function() {
      runs(function() { view.takeAITurn(); });
      waits(1);
      runs(function() { expect(TTT.AI.move).toHaveBeenCalledWith(board, 'o'); });

    });

    it("sets the current board to the result of the AI", function() {
      TTT.AI.move.andReturn(board);

      runs(function() { view.takeAITurn(); });
      waits(1);
      runs(function() { expect(view.setCurrentBoard).toHaveBeenCalledWith(board); });
    });

    describe("when it starts", function() {
      it("sets the message to 'Thinking...'", function() {
        view.message = {textContent: ""};

        view.takeAITurn();

        expect(view.message.textContent).toBe("Thinking...");
      });

      it("disabled the board", function() {
        var cellViewMock = {disable: jasmine.createSpy()};
        view.cells       = [cellViewMock];

        view.takeAITurn();

        expect(cellViewMock.disable).toHaveBeenCalled();
      });
    });

    describe("when its done", function() {
      describe("when the game is not over", function() { 
        beforeEach(function() {
          spyOn(TTT.Board, 'isOver').andReturn(false);
        });

        it("sets the message to 'Your turn'", function() {
          view.message = {textContent: ""};

          runs(function() { view.takeAITurn(); });
          waits(1);
          runs(function() { expect(view.message.textContent).toBe("Your turn") });
        });

        it("enables the board", function() {
          var cellViewMock = {disable: jasmine.createSpy(), enable: jasmine.createSpy()};
          view.cells       = [cellViewMock];

          runs(function() { view.takeAITurn(); });
          waits(1);
          runs(function() { expect(cellViewMock.enable).toHaveBeenCalled(); });
        });
      });

      describe("when the game is over", function() {
        it("displays the board's winner", function() {
          spyOn(TTT.Board, 'isOver').andReturn(true);
          spyOn(TTT.Board, 'winner').andReturn('z');
          spyOn(view,      'displayWinner')

          runs(function() { view.takeAITurn(); });
          waits(1);
          runs(function() { expect(view.displayWinner).toHaveBeenCalledWith('z') });
        });
      });
    });

  });

  describe("#setCurrentBoard", function() {
    it("sets the view's cells to the values in the board array", function() {
      var cell   = {setPiece: jasmine.createSpy()};
      view.cells = [cell];

      view.setCurrentBoard(['x']);

      expect(cell.setPiece).toHaveBeenCalledWith('x');
    });
  });

  describe("#displayWinner", function() {
    var message;

    beforeEach(function() {
      message      = {textContent: ""};
      view.message = message;
    });

    it("sets the message to 'Game Over. Tie game.' when there is no winner", function() {
      view.displayWinner(false);

      expect(message.textContent).toBe('Game Over. Tie game.');
    });

    it("sets the message to 'Game Over. x won.' when x won", function() {
      view.displayWinner('x');

      expect(message.textContent).toBe('Game Over. x won!');
    });
  });
});

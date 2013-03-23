describe("TTT View", function() {
  var TTTView = TTT.TTTView;

  var view;

  beforeEach(function() {
    var mock = {textContent: ""};
    var rootElement = {getElementsByClassName: function() { return [mock]; }};
    view = new TTTView(rootElement);
  });

  describe("#cellClick", function() {

    describe("when the cell is empty", function() {
      var cell, event;

      beforeEach(function() {
        cell = {textContent: ''};
        event = {target: cell};
        spyOn(view, 'takeAITurn');
        spyOn(TTT.Board, 'isOver').andReturn(false);
      });

      it("sets the cells text to 'x'", function() {
        view.cellClick(event);

        expect(cell.textContent).toBe('x');
      });

      describe("when the game is not over", function() {
        it("promts the AI to take its turn", function() {
          view.cellClick(event);

          expect(view.takeAITurn).toHaveBeenCalled();
        });
      });

      describe("when the game is over", function() {
        it("displays the winner", function() {
          TTT.Board.isOver.andReturn(true);
          spyOn(TTT.Board, 'winner').andReturn('z');
          spyOn(view, 'displayWinner')

          runs(function() { view.cellClick(event); });
          waits(1);
          runs(function() { expect(view.displayWinner).toHaveBeenCalledWith('z') });
        });
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

    describe("when the board is disabled", function() {
      it("does not change the cells text", function() {
        var cell = {textContent: ''},
            event = {target: cell};
        view.boardDisabled = true;

        view.cellClick(event);

        expect(cell.textContent).toBe('');
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
        view.boardDisabled = false;

        view.takeAITurn();

        expect(view.boardDisabled).toBeTruthy();
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
          view.boardDisabled = true;

          runs(function() { view.takeAITurn(); });
          waits(1);
          runs(function() { expect(view.boardDisabled).toBeFalsy() });
        });
      });

      describe("when the game is over", function() {
        it("displays the board's winner", function() {
          spyOn(TTT.Board, 'isOver').andReturn(true);
          spyOn(TTT.Board, 'winner').andReturn('z');
          spyOn(view, 'displayWinner')

          runs(function() { view.takeAITurn(); });
          waits(1);
          runs(function() { expect(view.displayWinner).toHaveBeenCalledWith('z') });
        });
      });
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

  describe("#displayWinner", function() {
    var message;
    beforeEach(function() {
      message = {textContent: ""};
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

describe("Board", function() {
  var Board = TTT.Board;

  describe(".isOver", function() {
    it("is false when it has null values", function() {
      expect(Board.isOver([null])).toBeFalsy();
    });

    describe("is true when", function() {
      it("is full", function() {
        expect(Board.isOver(['x'])).toBeTruthy();
      });
      
      it("has won horizontally", function() {
        var board = ['x', 'x', 'x',
                     ' ', ' ', ' ',
                     ' ', ' ', ' '];

        expect(Board.isOver(board)).toBeTruthy();
      });

      it("has won vertically", function() {
        var board = ['x', ' ', ' ',
                     'x', ' ', ' ',
                     'x', ' ', ' '];

        expect(Board.isOver(board)).toBeTruthy();
      });

      it("has won diagonally", function() {
        var board = [' ', ' ', 'x',
                     ' ', 'x', ' ',
                     'x', ' ', ' '];

        expect(Board.isOver(board)).toBeTruthy();
      });
    });
  });

  describe(".winner", function() {
    it("is false when there is no winner", function() {
      expect(Board.winner([])).toBeFalsy();
    });

    describe("returns the winner when", function() {
      it("has a horizontal win", function() {
        var board = [ ' ', ' ', ' ',
                      'x', 'x', 'x',
                      ' ', ' ', ' ' ];

        expect(Board.winner(board)).toBe('x');
      });

      it("has a vertical win", function() {
        var board = [ ' ', 'o', ' ',
                      ' ', 'o', ' ',
                      ' ', 'o', ' ' ];

        expect(Board.winner(board)).toBe('o');
      });

      it("has a diagonal win", function() {
        var board = [ 'z', ' ', ' ',
                      ' ', 'z', ' ',
                      ' ', ' ', 'z' ];

        expect(Board.winner(board)).toBe('z');
      });
    });
  });

  describe(".children", function() { 
    it("returns an empty array when there are no spots left", function() {
      expect(Board.children([], 'x')).toEqual([]);
    });

    it("returns a single child when there is one spot left", function() {
      var board = ['x', ' '];

      expect(Board.children(board, 'o')).toEqual([['x', 'o']]);
    });

    it("returns many children when there are many spots left", function() {
      var board    =  [' ', ' ', ' '],

          expected = [['x', ' ', ' '],
                      [' ', 'x', ' '],
                      [' ', ' ', 'x']];

      expect(Board.children(board, 'x')).toEqual(expected);
    });
  });
});

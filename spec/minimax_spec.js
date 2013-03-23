describe("Minimax", function() {
  var Minimax = TTT.Minimax;
  describe(".score", function() {
    it("is 1 for a won board", function() {
      var board = ['x', 'x', 'x'];

      expect(Minimax.score(board, 'x')).toBe(1);
    });

    it("is 0 when there isn't a winner", function() {
      var board = ['x', 'o', 'x'];

      expect(Minimax.score(board, 'x')).toBe(0);
    });

    it("is -1 for a lost board", function() {
      var board = ['x', 'x', 'x'];

      expect(Minimax.score(board, 'o')).toBe(-1);
    });

    describe("when the game isn't over yet", function() {
      describe("looking one turn ahead", function() {
        it("returns 1 if you can win next turn", function() {
          var board = ['x', 'x', ' '];

          expect(Minimax.score(board, 'x')).toBe(1);
        });

        it("returns 0 if you can tie next turn", function() {
          var board = ['x', 'o', ' '];

          expect(Minimax.score(board, 'x')).toBe(0);
        });
      });

      describe("looking a couple turns ahead", function() {
        it("returns -1 if you are going to lose on their turn no mater what", function() {
          var board = ['o', 'o', ' ',
                       'o', 'x', 'x',
                       ' ', 'x', 'o'];

          expect(Minimax.score(board, 'x')).toBe(-1);
        });
      });

      describe("looking even further ahead", function() {
        it("returns 1 if they are going to lose no mater where they go", function() {
          var board = ['o', 'x', ' ',
                       'x', 'o', 'x',
                       ' ', 'x', ' ']

          expect(Minimax.score(board, 'x')).toBe(1);
        });
      });

    });
  });
});

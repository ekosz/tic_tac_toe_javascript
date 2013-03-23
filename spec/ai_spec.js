describe("AI", function() {
  var AI = TTT.AI;

  it("chooses the winning move", function() {
    var board    = ['o', 'o', ' ',
                    'x', ' ', 'x',
                    'x', ' ', 'x'];

    var expected = ['o', 'o', 'o',
                    'x', ' ', 'x',
                    'x', ' ', 'x'];

    expect(AI.move(board, 'o')).toEqual(expected);
  });

  it("chooses the blocking move", function() {
    var board    = ['x', ' ', ' ',
                    'x', 'o', ' ',
                    ' ', ' ', ' '];

    var expected = ['x', ' ', ' ',
                    'x', 'o', ' ',
                    'o', ' ', ' '];

    expect(AI.move(board, 'o')).toEqual(expected);
  });
});

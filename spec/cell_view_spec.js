describe("CellView", function() {
  var CellView = TTT.CellView;

  var view;

  beforeEach(function() {
    var mockCell = {textContent: ""};
    view         = new CellView(mockCell);
  });

  describe("#click", function() {
    describe("when the cell is empty", function() {
      it("sets the cells text to 'x'", function() {
        view.click();

        expect(view.getPiece()).toBe('x');
      });
    });

    describe("when the cell is not empty", function() {
      var event;

      beforeEach(function() {
        event   = {stopPropagation: jasmine.createSpy()};
        view.el = {textContent: 'o'};
      });

      it("does not change the cells text", function() {
        view.click(event);

        expect(view.getPiece()).toBe('o');
      });

      it("stops the propagation of the event", function() {
        view.click(event);

        expect(event.stopPropagation).toHaveBeenCalled();
      });
    });

    describe("when the cell is disabled", function() {
      var event;

      beforeEach(function() {
        event         = {stopPropagation: jasmine.createSpy()};
        view.el       = {textContent: ''};
        view.disabled = true;
      });

      it("does not change the cells text", function() {
        view.click(event);

        expect(view.getPiece()).toBe('');
      });

      it("stops the propagation of the event", function() {
        view.click(event);

        expect(event.stopPropagation).toHaveBeenCalled();
      });
    });
  });
});

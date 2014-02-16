describe("Math", function() {
  describe("Computing average", function() {
    it("average for no date is NaN", function() {
      expect(isNaN(Math.avg([]))).toBe(true);
    });

    it("average for one number is the same number", function() {
      expect(Math.avg([1])).toEqual(1);
    });

    it("rounding works", function() {
      expect(Math.avg([0,0,1], 2)).toEqual(0.33);
    });

    it("rounding up works", function() {
      expect(Math.avg([0,0,2], 2)).toEqual(0.67);
    });

    it("rounding to integer works", function() {
      expect(Math.avg([0,0,5], 0)).toEqual(2);
    });

    it("rounding to integer (up) works", function() {
      expect(Math.avg([0,0,2], 0)).toEqual(1);
    });
  });

  describe("Parsing floats", function() {
    it("'1' is easily parsed to float", function() {
      expect(Math.parseFloat2("1")).toBe(1.0);
    });

    it("'1.5' is easily parsed to float", function() {
      expect(Math.parseFloat2("1.5")).toBe(1.5);
    });

    it("'1 234' is easily parsed to float", function() {
      expect(Math.parseFloat2("1 234")).toBe(1234);
    });

    it("' 1 234' is parsed to float", function() {
      expect(Math.parseFloat2(" 1 234")).toBe(1234);
    });

    it("' 1 234 ' is parsed to float", function() {
      expect(Math.parseFloat2(" 1 234 ")).toBe(1234);
    });

    it("' 1 234,56 ' is parsed to float", function() {
      expect(Math.parseFloat2(" 1 234,56 ")).toBe(1234.56);
    });
  });
});
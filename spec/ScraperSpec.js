describe("Scraper", function() {
  it("[mock] should run when at least one auction is available and search hits are displayed", function() {
    var mockDocument = {
      getElementsByClassName: function(className) {
        return ['foo'];
      },
      getElementById: function(id) {
        return 'bar';
      }
    };
    var scraper = new Scraper(mockDocument)
    expect(scraper.shouldRun()).toBe(true);
  });
  it("[mock] should not run when no 'hits count' was found", function() {
    var mockDocument = {
      getElementsByClassName: function(className) {
        return ['foo'];
      },
      getElementById: function(id) {
        return null;
      }
    };
    var scraper = new Scraper(mockDocument);
    spyOn(mockDocument, 'getElementById').and.callThrough();
    spyOn(mockDocument, 'getElementsByClassName').and.callThrough();

    expect(scraper.shouldRun()).toBe(false);
    expect(mockDocument.getElementById).toHaveBeenCalledWith('main-breadcrumb-search-hits');
    expect(mockDocument.getElementsByClassName).not.toHaveBeenCalledWith('bid dist');
  });
  it("[mock] should not run when no 'prices' were found", function() {
    var mockDocument = {
      getElementsByClassName: function(className) {
        return [];
      },
      getElementById: function(id) {
        return 'bar';
      }
    };
    var scraper = new Scraper(mockDocument);
    spyOn(mockDocument, 'getElementById').and.callThrough();
    spyOn(mockDocument, 'getElementsByClassName').and.callThrough();

    expect(scraper.shouldRun()).toBe(false);
    expect(mockDocument.getElementById).toHaveBeenCalledWith('main-breadcrumb-search-hits');
    expect(mockDocument.getElementsByClassName).toHaveBeenCalledWith('bid dist');
  });
});
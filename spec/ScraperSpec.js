describe("Scraper", function() {
  it("[mock] should *not* run when ", function() {
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
  it("[mock] should run when at least one auction is available and search hits are displayed", function() {
    var mockDocument = {
      getElementsByClassName: function(className) {
        return [];
      },
      getElementById: function(id) {
        return 'bar';
      }
    };
    var scraper = new Scraper(mockDocument);
    spyOn(scraper, 'getElementById');

    expect(scraper.shouldRun()).toBe(false);
    expect(scraper.getElementById).toHaveBeenCalledWith('main-breadcrumb-search-hits');
  });
});
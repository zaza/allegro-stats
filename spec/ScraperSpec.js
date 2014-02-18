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
  it("[mock] 'hits count' is properly updated", function() {
    var small = document.createElement('small');
    small.id = 'main-breadcrumb-search-hits';
    small.innerHTML = '(12 ofert)'; 
    var mockDocument = {
      getElementsByClassName: function(className) {
        return ['foo'];
      },
      getElementById: function(id) {
        return small;
      }
    };
    var scraper = new Scraper(mockDocument);

    scraper.updateSearchHits(1.5);

    expect(small.innerHTML).toBe('(12 ofert) średnia=1.5');
  });
});
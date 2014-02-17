// ==UserScript==
// @name        Allegro - Średnia cena oglądanych aukcji
// @namespace   http://github.com/zaza
// @include     http://allegro.pl/*
// @version     0.4*
// @grant       none
// ==/UserScript==

Math.avg = function(data, round) {
    var sum = 0
    for (var i = 0; i < data.length; i++) {
        sum += data[i]
    }
    var avg = sum/data.length
    return Number((avg).toFixed(round))
};

Math.parseFloat2 = function(string) {
    string = string.replace(/\s+/g, '')
    string = string.replace(/,/g, '.')
    return parseFloat(string)
};

function Scraper(doc) {
    this.doc = doc
}
Scraper.prototype.shouldRun = function() {
  return this.doc.getElementById('main-breadcrumb-search-hits') != null 
    && this.doc.getElementsByClassName('bid dist').length > 0
};

(function() {
    var scraper = new Scraper(document)
    if (!scraper.shouldRun())
        return
    var prices = []
    // 'buy-now dist'
    var spans = document.getElementsByClassName('bid dist')
    if (spans.length == 0) return
    for (var i = 0; i < spans.length; i++) {
        var price = spans[i].childNodes[2].nodeValue
        prices.push(Math.parseFloat2(price))
    }

    var avg = Math.avg(prices, 2)

    var hits = document.getElementById('main-breadcrumb-search-hits')
    if (hits != null)
        hits.innerHTML += " średnia="+avg
})();
// ==UserScript==
// @name        Allegro - Srednia cena ogladanych aukcji
// @namespace   http://github.com/zaza
// @include     http://allegro.pl/*
// @version     0.3
// @grant       none
// ==/UserScript==

(function() {
var prices = []
var spans = document.getElementsByClassName('bid dist')
for (var i = 0; i < spans.length; i++) {
    var price = spans[i].childNodes[2].nodeValue
    price = price.replace(/\s+/g, '');
    prices.push(parseFloat(price))
}

var sum = 0;
for (var i = 0; i < prices.length; i++){
    sum += prices[i];
}

var avg = sum/prices.length;
avg = Number((avg).toFixed(2))

if (!isNaN(avg))
	document.getElementById('main-breadcrumb-search-hits').innerHTML += " Å›rednia="+avg;
})();



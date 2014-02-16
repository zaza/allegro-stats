// ==UserScript==
// @name        Srednia cena ogladanych aukcji
// @namespace   http://github.com/zaza
// @include     http://allegro.pl/listing/*
// @version     0.1
// @grant       none
// ==/UserScript==

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

document.getElementById('main-breadcrumb-search-hits').innerHTML += " srednia="+avg;



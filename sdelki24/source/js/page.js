// Routines to handle page
var px = require("./px");
var pages = null;
var current = 0;
var container = document.querySelector(".container");
var scroller = document.querySelector(".scroller");

var bigBreakpoint = 850;
var smallBreakpoint = 660;

var minHeight = 650;

var wrap = function(nodelist) {
  return [].slice.call(nodelist);
};

var fixScroller = function(idx) {
  var items = document.querySelectorAll(".scroller__item");
  var item;

  for(var i = 0; i < items.length; ++i) {
    item = items[i];
    item.classList[
      parseInt(item.dataset.idx) === idx ? "add" : "remove"
    ]("scroller__item_selected");
  }
};

module.exports = {
  all: function() {
    return pages || (pages = wrap(document.querySelectorAll(".section_page")))
  },
  height: function() {
    return Math.max(window.innerHeight, minHeight);
  },
  down: function() {
    if(current < this.all().length - 1) {
      current++;
    }
    this.slide();
  },
  up: function() {
    if(current > 0) {
      current--;
    }
    this.slide();
  },
  go: function(idx) {
    current = idx;
    this.slide();
  },
  slide: function() {
    container.style.transitionProperty = "top";
    this.fix();
    setTimeout(function() { container.style.transitionProperty = "none"; }, 600);
  },
  last: function() {
    current = this.all().length - 1;
    this.slide();
  },
  fix: function() {
    container.style.top = px(-current * this.height());
    fixScroller(current);
  },
  fixForce: function() {
    var saveProperties = container.style.transitionProperty;
    container.style.transitionProperty = "none !important;";
    this.fix();
    setTimeout(function() { container.style.transitionProperty = saveProperties; }, 600);
  },
  media: function(minSize) {
    var classList = container.classList;

    if(minSize > bigBreakpoint) {
      classList.add("container_big");
      classList.remove("container_normal");
      classList.remove("container_small");

      scroller.style.visibility = "visible";

    } else if(minSize < smallBreakpoint) {
      classList.add("container_small");
      classList.remove("container_normal");
      classList.remove("container_big");

      scroller.style.visibility = "hidden";

    } else {
      classList.add("container_normal");
      classList.remove("container_small");
      classList.remove("container_big");

      scroller.style.visibility = "visible";
    }
  }
}

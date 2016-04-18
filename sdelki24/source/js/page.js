// Routines to handle page
var px = require("./px");
var pages = null;
var current = 0;
var container = document.querySelector(".container");

var bigBreakpoint = 960;
var smallBreakpoint = 400;

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
    return window.innerHeight;
  },
  down: function() {
    if(current < this.all().length - 1) {
      current++;
    }
    this.fix();
  },
  up: function() {
    if(current > 0) {
      current--;
    }
    this.fix();
  },
  go: function(idx) {
    current = idx;
    this.fix();
  },
  fix: function() {
    container.style.top = px(-current * this.height());
    fixScroller(current);
  },
  media: function(minSize) {
    var classList = container.classList;

    if(minSize > bigBreakpoint) {
      classList.add("container_big");
      classList.remove("container_normal");
      classList.remove("container_small");
    } else if(minSize < smallBreakpoint) {
      classList.add("container_small");
      classList.remove("container_normal");
      classList.remove("container_big");
    } else {
      classList.add("container_normal");
      classList.remove("container_small");
      classList.remove("container_big");
    }
  }
}

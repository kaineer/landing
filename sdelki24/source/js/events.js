var px = require("./px");
var page = require("./page");
var canScroll = true;
var Key = require("./keys");

var wheelEventType =
    (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

var Direction = {
  UP: 1,
  DOWN: 2,
  NONE: 0
};

var domMouseScrollDirection = function(evt) {
  if(evt.detail < 0) {
    return Direction.UP;
  }
  if(evt.detail > 0) {
    return Direction.DOWN;
  }
  return Direction.NONE;
};

var mouseWheelDirection = function(evt) {
  if(evt.deltaY < 0) {
    return Direction.UP;
  }
  if(evt.deltaY > 0) {
    return Direction.DOWN;
  }
  return Direction.NONE;
};

var getDirection = {
  "mousewheel": mouseWheelDirection,
  "DOMMouseScroll": domMouseScrollDirection
}[wheelEventType];

var resizeHandler = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var minSize = Math.min(width, height);

  page.all().forEach(function(section) {
    section.style.height = px(page.height());
  });

  page.fix();

  page.media(minSize);
};

var scrollByDirection = function(direction) {
  if(direction != Direction.NONE && canScroll) {
    switch(direction) {
      case Direction.UP: page.up(); break;
      case Direction.DOWN: page.down(); break;
    }

    canScroll = false;
    setTimeout(function() {
      canScroll = true;
    }, 500);
  }
};

var scrollHandler = function(evt) {
  var direction = getDirection(evt);

  scrollByDirection(direction);
};

var keyupHandler = function(evt) {
  evt.preventDefault();

  if([Key.SPACE, Key.DOWN].indexOf(evt.which) > -1) {
    scrollByDirection(Direction.DOWN);
  } else if([Key.UP].indexOf(evt.which) > -1) {
    scrollByDirection(Direction.UP);
  }
};

module.exports = function() {
  window.addEventListener("resize", resizeHandler);
  window.addEventListener(wheelEventType, scrollHandler);
  window.addEventListener("keyup", keyupHandler);

  resizeHandler();
};

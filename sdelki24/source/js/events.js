var px = require("./px");
var page = require("./page");
var canScroll = true;
var Key = require("./keys");
var hashes = require("./hashes");

var screenshotHd = document.querySelector(".screenshot-hd");
var screenshot   = document.querySelector(".screenshot");
var wheelEventType =
    (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";

var Direction = {
  UP: 1,
  DOWN: 2,
  NONE: 0
};

var toggleVisibility = function(el, flag) {
  el.style.display = flag ? "inline" : "none";
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

  if(width < 1446 || height < 714) {
    toggleVisibility(screenshotHd, false);
    toggleVisibility(screenshot, true);
  } else {
    toggleVisibility(screenshotHd, true);
    toggleVisibility(screenshot, false);
  }
};

var scrollByDirection = function(direction) {
  if(direction != Direction.NONE && canScroll) {
    canScroll = false;

    switch(direction) {
      case Direction.UP: page.up(); break;
      case Direction.DOWN: page.down(); break;
    }

    setTimeout(function() {
      canScroll = true;
    }, 700);
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
  } else if(evt.which == Key.HOME) {
    page.go(0);
  } else if(evt.which == Key.END) {
    page.last();
  }
};

var clickTryHandler = function(evt) {
  evt.preventDefault();

  location = "#register";
};

var hashchangeHandler = function(evt) {
  changePageByHash(false);
};

var changePageByHash = function(flag) {
  var hash = location.hash.substr(1);
  var idx = hashes.indexOf(hash);

  if(idx > -1) {
    page.go(idx, flag);
  }
}

module.exports = function() {
  window.addEventListener("resize", resizeHandler);
  window.addEventListener(wheelEventType, scrollHandler);
  window.addEventListener("keyup", keyupHandler);
  window.addEventListener("hashchange", hashchangeHandler);

  var links = [].slice.call(document.querySelectorAll(".section__try-link"));
  links.forEach(function(link) {
    link.addEventListener("click", clickTryHandler);
  });

  resizeHandler();
  changePageByHash(true);
};

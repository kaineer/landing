/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);

	window.onload = function() {
	  __webpack_require__(2)();
	  __webpack_require__(5)();
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	//
	var arrayPrototype = Array.prototype;

	var ponyfills = {
	  forEach: function(cb) {
	    var len = this.length;
	    for(var i = 0; i < len; ++i) {
	      cb(this[i], i, this);
	    }
	  }
	};

	// handle polyfills
	var cb;
	for(var key in ponyfills) {
	  cb = ponyfills[key];
	  arrayPrototype[key] || (arrayPrototype[key] = cb);
	}


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	//
	var pages = __webpack_require__(3);

	module.exports = function() {
	  var count = pages.all().length;
	  var html = "";

	  for(var i = 0; i < count; ++i) {
	    html += "<div class='scroller__item' data-idx='" + i + "'></div>";
	  }

	  var scroller = document.querySelector(".scroller");
	  var items = scroller.querySelectorAll(".scroller__item");
	  scroller.innerHTML = html;

	  scroller.addEventListener("click", function(evt) {
	    var idx = evt.target.dataset["idx"];
	    pages.go(idx);
	  });
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Routines to handle page
	var px = __webpack_require__(4);
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function(number) {
	  return (number || 0) + "px";
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var px = __webpack_require__(4);
	var page = __webpack_require__(3);
	var canScroll = true;
	var Key = __webpack_require__(6);

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	  UP: 38,
	  DOWN: 40,
	  SPACE: 32
	};


/***/ }
/******/ ]);
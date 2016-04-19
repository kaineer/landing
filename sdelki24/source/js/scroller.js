//
var pages = require("./page");

var hashes = require("./hashes");

module.exports = function() {
  var count = pages.all().length;
  var html = "";

  for(var i = 0; i < count; ++i) {
    html += "<div class='scroller__item' data-hash='" + hashes[i] + "' data-idx='" + i + "'></div>";
  }

  var scroller = document.querySelector(".scroller");
  var items = scroller.querySelectorAll(".scroller__item");
  scroller.innerHTML = html;

  scroller.addEventListener("click", function(evt) {
    // var idx = evt.target.dataset["idx"] * 1;
    // pages.go(idx);
    var hash = evt.target.dataset["hash"];
    location = "#" + hash;
  });
};

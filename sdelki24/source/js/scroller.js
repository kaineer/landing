//
var pages = require("./page");

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

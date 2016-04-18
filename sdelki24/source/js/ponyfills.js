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

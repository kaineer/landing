var gulp = require("gulp");
var sass = require("gulp-sass");
var webpack = require("webpack-stream");

gulp.task("sass", function() {
  gulp.src("source/scss/main.scss").
    pipe(sass()).
    pipe(gulp.dest("build/css"));
});

gulp.task("js", function() {
  gulp.src("source/js/main.js").
    pipe(webpack(require("./webpack.config.js"))).
    pipe(gulp.dest("build/js"));
});

gulp.task("html", function() {
  gulp.src("source/index.html").
    pipe(gulp.dest("build"));
});

gulp.task("img", function() {
  gulp.src("source/img/*.png").
    pipe(gulp.dest("build/img"));
});

gulp.task("build", ["js", "sass", "html", "img"]);

const gulp = require("gulp");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const path = require("path");
const svgmin = require("gulp-svgmin");
const inject = require("gulp-inject");

gulp.task("prepare-svgstore", () => {
  var svgs = gulp
    .src('src/assets/images/icons/*.svg')
    .pipe(svgmin(function () {
      return {
        plugins: [{
          cleanupIDs: {
            minify: true
          }
        }]
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        const svgs = Object.values($('svg'));
        if (svgs[0].attribs.width && svgs[0].attribs.height) {
          $('svg').attr("viewBox", "0 0" + " " + svgs[0].attribs.width + " " + svgs[0].attribs.height);
        }
      }
    }))
    .pipe(svgstore({inlineSvg: true}))
    .pipe(cheerio({
      run: function ($) {
        $('svg').attr('style', 'display:none');
      }
    }));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src('./src/index.html')
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("./src/"));
});

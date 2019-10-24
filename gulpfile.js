"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var sourcemaps = require("gulp-sourcemaps");
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}


function style() {
  // Where should gulp look for the sass files?
  // My .sass files are stored in the styles folder
  // (If you want to use scss files, simply look for *.scss files instead)
  return (
    gulp
      .src("./src/resources/sass/*.sass")
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      // Use sass with the files found, and log any errors
      .pipe(sass())
      .on("error", sass.logError)
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write())
      // What is the destination for the compiled file?
      .pipe(gulp.dest("./src/resources/css"))
  );
}

function tscompile() {
  return (
    gulp.src('./src/resources/ts/*.ts')
      .pipe(sourcemaps.init())
      .pipe(ts({
        noImplicitAny: true,
        out: 'custom.js'
      }))
      .pipe(gulp.dest('./src/resources/ts'))
  );
}

function tsmove(){
  return (
    gulp.src(['./src/resources/ts/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./src/resources/js'))
  );
}

// Clean vendor
function clean() {
  return del(["./src/vendor/", "./dist"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  var arr = [];
  arr.push(gulp.src('./node_modules/bootstrap/dist/**/*').pipe(gulp.dest('./src/vendor/bootstrap')));
  arr.push(gulp.src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js']).pipe(gulp.dest('./src/vendor/jquery')));
  arr.push(gulp.src(['./node_modules/slider-fotorama/dist/*']).pipe(gulp.dest('./src/vendor/slider-fotorama')));
  arr.push(gulp.src(['./node_modules/owl.carousel/dist/**/*']).pipe(gulp.dest('./src/vendor/owl.carousel')));
  arr.push(gulp.src(['./node_modules/font-awesome/css/**/*']).pipe(gulp.dest('./src/vendor/font-awesome/css')));
  arr.push(gulp.src(['./node_modules/font-awesome/fonts/**/*']).pipe(gulp.dest('./src/vendor/font-awesome/fonts')));
  return merge(arr);
}

// Watch files
function watchFiles() {
  gulp.watch("./src/**/*.css", browserSyncReload);
  gulp.watch("./src/**/*.html", browserSyncReload);
  gulp.watch('./src/resources/sass/*.sass', style);
  gulp.watch('./src/resources/ts/*.ts', gulp.series(tscompile, tsmove, browserSyncReload));
}

// Copiar en dist
function copy() {
  var arr = [];
  arr.push(gulp.src('./src/*.html').pipe(gulp.dest('./dist')));
  arr.push(gulp.src('./src/favicon.ico').pipe(gulp.dest('./dist')));
  arr.push(gulp.src('./src/resources/css/**/*').pipe(gulp.dest('./dist/resources/css')));
  arr.push(gulp.src('./src/resources/img/**/*').pipe(gulp.dest('./dist/resources/img')));
  arr.push(gulp.src('./src/resources/js/**/*').pipe(gulp.dest('./dist/resources/js')));
  arr.push(gulp.src('./src/web/**/*').pipe(gulp.dest('./dist/web')));
  arr.push(gulp.src('./src/vendor/**/*').pipe(gulp.dest('./dist/vendor')));
  return merge(arr);
}

// Define complex tasks
const vendor = gulp.series(clean, modules, copy);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));


// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;
exports.style = style;
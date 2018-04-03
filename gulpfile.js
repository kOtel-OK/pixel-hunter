'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const rollup = require('gulp-better-rollup');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const watch = require('gulp-watch');

const serverConfig = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 9000,
  logPrefix: "kOtel_OK"
};

gulp.task('webServer', function () {
  browserSync(serverConfig);
});

gulp.task('js', function () {
  gulp.src('js/main.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(rollup({}, 'iife'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function () {
  gulp.src('index.html')
    .pipe(gulp.dest('build'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('css', function () {
  gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('img', function () {
  gulp.src('img/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()],
      svgoPlugins: [{removeViewBox: false}],

    }))
    .pipe(gulp.dest('build/img/'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('clean', function () {
  del(['build/js/**/*', 'build/css/**/*', 'build/img/**/*']);
});

gulp.task('build', ['html', 'js', 'css', 'img']);

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('img/**/*', ['img']);
  gulp.watch('index.html', ['html']);
  gulp.watch('sass/**/*', ['css']);
});

gulp.task('default', ['clean', 'build', 'webServer', 'watch']);

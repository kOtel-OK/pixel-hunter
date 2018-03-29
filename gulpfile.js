'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
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
  gulp.src('js/*.js')
    .pipe(plumber())
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
    // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    // .pipe(rename('style.min.css'))
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

gulp.task('build', ['html', 'js', 'css', 'img']);

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('img/**/*', ['img']);
  gulp.watch('index.html', ['html']);
  gulp.watch('sass/**/*', ['css']);
});

gulp.task('default', ['build', 'webServer', 'watch']);



// gulp.task('style', function () {
//   gulp.src('sass/style.scss')
//     .pipe(plumber())
//     .pipe(sass())
//     .pipe(postcss([
//       autoprefixer({
//         browsers: [
//           'last 1 version',
//           'last 2 Chrome versions',
//           'last 2 Firefox versions',
//           'last 2 Opera versions',
//           'last 2 Edge versions'
//         ]
//       }),
//       mqpacker({sort: true})
//     ]))
//     .pipe(gulp.dest('build/css'))
//     .pipe(server.stream())
//     .pipe(minify())
//     .pipe(rename('style.min.css'))
//     .pipe(gulp.dest('build/css'));
// });
//
// gulp.task('scripts', function () {
//   return gulp.src('js/**/*.js')
//     .pipe(plumber())
//     .pipe(gulp.dest('build/js/'));
// });
//
// gulp.task('test', function () {
// });
//
// gulp.task('imagemin', ['copy'], function () {
//   return gulp.src('build/img/**/*.{jpg,png,gif}')
//     .pipe(imagemin([
//       imagemin.optipng({optimizationLevel: 3}),
//       imagemin.jpegtran({progressive: true})
//     ]))
//     .pipe(gulp.dest('build/img'));
// });
//
//
// gulp.task('copy-html', function () {
//   return gulp.src('*.html')
//     .pipe(gulp.dest('build'))
//     .pipe(server.stream());
// });
//
// gulp.task('copy', ['copy-html', 'scripts', 'style'], function () {
//   return gulp.src([
//     'fonts/**/*.{woff,woff2}',
//     'img/*.*'
//   ], {base: '.'})
//     .pipe(gulp.dest('build'));
// });
//
// gulp.task('clean', function () {
//   return del('build');
// });
//
// gulp.task('js-watch', ['scripts'], function (done) {
//   server.reload();
//   done();
// });
//
// gulp.task('serve', ['assemble'], function () {
//   server.init({
//     server: './build',
//     notify: false,
//     open: true,
//     port: 3502,
//     ui: false
//   });
//
//   gulp.watch('sass/**/*.{scss,sass}', ['style']);
//   gulp.watch('*.html', ['copy-html']);
//   gulp.watch('js/**/*.js', ['js-watch']);
// });
//
// gulp.task('assemble', ['clean'], function () {
//   gulp.start('copy', 'style');
// });
//
// gulp.task('build', ['assemble', 'imagemin']);

const { src, dest, parallel, series, watch } = require('gulp');
const del = require('del');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const cleanDist = () => del('build/**/*', { force: true });

const buildHtml = () => src('app/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(dest('build'));

const buildCss = () => src(['app/scss/variables.scss', 'app/scss/fonts.scss', 'app/scss/general.scss', 'app/scss/header.scss', 'app/scss/nav.scss', 'app/scss/career.scss', 'app/scss/slider.scss', 'app/scss/hamburger.scss'])
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(concat('style.css'))
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
  .pipe(sourcemaps.write())
	.pipe(dest('build'));

const buildJs = () => src(['node_modules/jquery/dist/jquery.min.js', 'app/js/jquery.flexnav.min.js', 'app/js/jquery.flexslider-min.js', 'app/js/app.js'])
	.pipe(concat('app.min.js'))
	.pipe(dest('build'));

const buildImages = () => src('app/images/**/*')
  .pipe(imagemin())
  .pipe(dest('build/images'));

const buildTtf = () => src('app/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('build/fonts'));

const buildWoff = () => src('app/fonts/*.ttf')
  .pipe(ttf2woff())
  .pipe(dest('build/fonts'));

const buildWoff2 = () => src('app/fonts/*.ttf')
  .pipe(ttf2woff2())
  .pipe(dest('build/fonts'));

const startWatch = () => {
	watch('app/**/*.pug', buildHtml);
  watch('app/scss/*.scss', buildCss);
  watch('app/js/*.js', buildJs);
  watch('app/images/**/*', buildImages);
  watch('app/fonts/*.ttf', buildTtf);
  watch('app/fonts/*.ttf', buildWoff);
  watch('app/fonts/*.ttf', buildWoff2);
};

exports.default = series(cleanDist, parallel(buildHtml, buildCss, buildJs, buildImages, buildTtf, buildWoff, buildWoff2), startWatch);

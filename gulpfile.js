const {src , dest, watch, parallel} = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const avif = require('gulp-avif');
const rename = require('gulp-rename');
const jsmin = require('gulp-jsmin');



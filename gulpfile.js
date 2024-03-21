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
const terser = require("gulp-terser");
const uglify = require('gulp-uglify');


const scss = 'src/scss/**/*.scss';
const assets = 'src/assets/**/**/**/*.{ico,php,otf,svg}';
const img = 'src/assets/images/*.{png,jpg,jpeg}';
// const fonts = 'src/assets/fonts/*.otf';
const javascript = 'src/js/**/*.js';


function cssgenerator(done){
    src(scss)
    .pipe(sass())
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe( sass())//compila el archivo usando el binario de SASS
    .pipe( postcss([ autoprefixer(), cssnano() ]) )
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('public/css'));
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50
    };
    src(img)
        .pipe( webp(opciones) )
        .pipe(dest('public/images'))

    done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };
    src(img)
        .pipe( avif(opciones) )
        .pipe(dest(['public/images']))
    done();
}

function imgGenerator(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src(img)
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('public/images'))
    done();
}

function assetsGenerator(done){
    src(assets)
        .pipe(dest('public/assets'))
    done();
}

function jsGenerator(done){
    src(javascript)
    .pipe(uglify())
    // .pipe(sourcemaps.init()) 
    // .pipe(jsmin())
    .pipe(terser({
        mangle: true, // Habilita la ofuscación de nombres de variables y funciones
        compress: true, // Habilita la compresión y optimización del código
        output: {
          comments: false // Elimina los comentarios del código minificado
        }
    }))
    .pipe(rename({suffix: '.min'}))
    // .pipe(sourcemaps.write('.')) 
    .pipe(dest('public/js/'))
    done();
}


function building(done){
    watch(scss,cssgenerator);
    watch(img,imgGenerator);
    watch(img,versionWebp);
    watch(img,versionAvif);
    watch(javascript,jsGenerator);
    watch(assets,assetsGenerator);
}


exports.cssgenerator = cssgenerator;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.imgGenerator = imgGenerator;
exports.assetsGenerator = assetsGenerator;
exports.jsGenerator = jsGenerator;

exports.build = parallel(cssgenerator,versionWebp,versionAvif,imgGenerator,assetsGenerator,jsGenerator,building);

